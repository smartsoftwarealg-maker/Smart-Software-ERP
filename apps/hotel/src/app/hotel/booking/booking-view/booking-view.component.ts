import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BookingService} from '../booking.service';
import {dateToStr, LoadingState, strToDateTime} from '../../../common/util';
import {Booking, Room} from '../../hotel-api';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {PaginationModel} from '@ss/common/ui-pagination';
import {Observable, Subscription} from 'rxjs';
import {HttpService} from 'smart-shared';
import {NotificationsComponent} from './notifications/notifications.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentACModel} from '../booking-api';

interface RoomWB extends Room {
    bookings: Booking[];
}

const fullBookingUrl = '/hotels/fullBooking';

@Component({
    selector: 'app-booking',
    templateUrl: './booking-view.component.html',
    styleUrls: ['./booking-view.component.scss']
})
export class BookingViewComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('notifications', {static: false}) notifications: NotificationsComponent;
    notificationsUpdateInterval = null;
    // ui
    loadingState: LoadingState;
    // dates
    firstDay: Date;
    lastDay: Date;
    days: Date[];
    // pagination for rooms
    paginationModel: PaginationModel = PaginationModel.newInstance({page: 1, pageSize: 10, elementCount: 0});
    // rooms
    rooms: RoomWB[];
    //
    rfSubscription: Subscription;

    showCancelled = false;

    agentACModel: AgentACModel;

    constructor(public bookingSrv: BookingService,
                public httpSrv: HttpService,
                private router: Router,
                public activatedRoute: ActivatedRoute) {
        this.paginationModel.onChange = () => this.refresh();
        this.agentACModel = new AgentACModel(httpSrv);
        this.agentACModel.onSelection = agent => {
            bookingSrv.listFilters.selectedAgentId = (agent || {id: null}).id;
            this.refresh();
        };
    }

    static defaultFirstDate() {
        const date = new Date();
        date.setDate(date.getDate() - 2);
        return date.getTime();
    }

    ngOnInit() {
        this.rfSubscription = this.bookingSrv.listFilters.roomsFilter.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(() => {
                this.refresh();
            });
        this.genDays();
        this.refresh();
    }

    ngAfterViewInit(): void {
        this.notifications.periodicRefresh();
        this.notificationsUpdateInterval = setInterval(() => this.notifications.periodicRefresh(), 10000);
    }

    ngOnDestroy(): void {
        if (this.notificationsUpdateInterval) {
            clearInterval(this.notificationsUpdateInterval);
        }
        if (this.rfSubscription) {
            this.rfSubscription.unsubscribe();
        }
        this.agentACModel.onSelection = null;
    }

    refresh() {
        if (this.loadingState === LoadingState.LOADING) {
            return;
        }
        this.loadingState = LoadingState.LOADING;
        this.bookingSrv.load()
            .pipe(
                switchMap(() => this.loadRooms()),
                switchMap(() => this.loadBookings())
            ).subscribe(() => this.loadingState = LoadingState.COMPLETE,
            e => {
                this.loadingState = LoadingState.ERROR;
                throw e;
            }
        );
    }

    genDays() {
        const someDay = this.bookingSrv.listFilters.firstDay;
        const time: number = someDay == null ? BookingViewComponent.defaultFirstDate() : someDay.getTime();
        const DAYS_COUNT = 15;
        this.days = [];
        for (let i = 0; i < DAYS_COUNT; i++) {
            this.days.push(new Date(time));
            this.days[i].setDate(this.days[i].getDate() + i);
        }
        this.firstDay = this.days[0];
        this.lastDay = this.days[DAYS_COUNT - 1];
    }

    loadRooms(): Observable<Room[]> {
        return this.bookingSrv.loadRooms(
            this.paginationModel.page - 1,
            this.paginationModel.pageSize,
            this.bookingSrv.listFilters.roomsFilter.value,
            this.bookingSrv.listFilters.selectedRoomType,
            this.bookingSrv.listFilters.selectedRoomOptions,
            this.bookingSrv.listFilters.selectedAgentId
        ).pipe(tap(rooms => {
            this.paginationModel.elementCount = this.httpSrv.itemCount;
            this.rooms = rooms.map(x => x as RoomWB);
        }));
    }

    loadBookings() {
        let filter =
            '&from' + dateToStr(this.firstDay) +
            '&to' + dateToStr(this.lastDay) +
            '&rooms' + (this.rooms || []).map(r => r.id).join(',');
        if (this.bookingSrv.listFilters.selectedAgentId != null) {
            filter += '&agent' + this.bookingSrv.listFilters.selectedAgentId;
        }
        return this.httpSrv.getData<{ _1: Booking, _2: string }[][]>(fullBookingUrl, 0, 49, filter)
            .pipe(tap((result: { _1: Booking, _2: string }[][]) => {
                    const bookings = result.map(bArr => {
                        return bArr.map(b => {
                            const B: Booking = b._1;
                            B.customerName = b._2;
                            B.dateIn = strToDateTime(B.dateIn as string);
                            B.dateOut = strToDateTime(B.dateOut as string);
                            B.firstActionDate = strToDateTime(B.firstActionDate as string);
                            B.secondActionDate = strToDateTime(B.secondActionDate as string);
                            return B;
                        });
                    });
                    for (let i = 0; i < this.rooms.length; i++) {
                        const room: any = this.rooms[i];
                        room.bookings = bookings[i];
                    }
                })
            );
    }

    edit(id: number, dateIn?: Date, dateOut?: Date, room?: Room): void {
        // todo: pass the required parameters to the service
        this.bookingSrv.setDetailParameters({
            id, from: dateIn, to: dateOut, room
        });
        this.router.navigate(['' + (id || 0)], {relativeTo: this.activatedRoute});
    }

    // events

    onDateChanged(date: Date) {
        this.bookingSrv.listFilters.firstDay = date;
        this.genDays();
        this.loadBookings();
    }

    onRoomTypeChanged(type: number) {
        this.bookingSrv.listFilters.selectedRoomType = type;
        this.refresh();
    }

    setShowCancelled(b: boolean) {
        this.showCancelled = b;
        this.refresh();
    }

    openEditBookingDialog(id: number) {
        // todo: check access rights first
        this.edit(id);
    }

    createBooking(dIn: Date, dOut: Date, room: Room): void {
        // todo: check access rights first
        this.edit(0, dIn, dOut, room);
    }

    createBooking2(start: number, length: number, room: Room): void {
        const out = new Date(this.days[start]);
        out.setDate(out.getDate() + length);
        this.createBooking(this.days[start], out, room);
    }

    // utils

    goToRoomDetail = (id: number) => this.router.navigate(['/hotel/rooms/' + id], {queryParams: {referer: '/hotel/bookings'}});
    goToBooking = (id: number) => this.router.navigate(['/hotel/bookings/' + id]);
}
