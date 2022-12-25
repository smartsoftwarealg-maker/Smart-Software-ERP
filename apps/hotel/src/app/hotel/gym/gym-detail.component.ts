import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { SnackBarService } from '../../common/snack-bar.service';
import { ConfirmationDialogService } from '../../common/confirmation-dialog/confirmation-dialog.service';
import { GymService } from './gym-service';
import { DisplayableService, FullService, Room, ServiceDetail } from '../hotel-api';
import { AgentACModel, FullServiceDataSource } from './gym-api';
import { dateTimeToStr, LoadingState, strToDateTime } from '../../common/util';
import { map, switchMap } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BookingStates } from '../restaurant/restaurant-api';
import { Right } from '../../smart-lib/common/models';
import { UserService } from '../../smart-lib/components/login/user.service';
import { deepCopy } from '../../smart-lib/common/util';
import { HttpService } from '../../smart-lib/common/http.service';

const millisecondsInMin = 60000;

const payModeCash = 66;
const roomsByBookingUrl = '/hotels/roomsByBooking';
const bookingUrl = '/hotels/bookings';

interface BookedRoom {
    id: number;
    rooms: string;
}

function calculateStampFromAmount(amount: number, payMethod: number) {
    if (payModeCash === payMethod) {
        return Math.min(2500.0, Math.ceil(0.01 * amount));
    }
    return 0.0;
}

function calculateTotal(inv: FullService) {
    return inv.details.map(item =>
        item.price * item.qty
    ).reduce((a, b) => a + b, 0);
}

function calculateVAT(inv: FullService) {
    return inv.details.map(item => {
        return (item.vat * item.price * item.qty) / 100;
    }
    ).reduce((a, b) => a + b, 0);
}

function minutesBetween(from: string, to: string): number {
    const end = strToDateTime(from);
    const start = strToDateTime(to);
    if (end == null || start == null) {
        return 0;
    }
    return minutesBetweenInstants(end.getTime(), start.getTime());
}

function minutesBetweenInstants(from: number, to: number): number {
    return Math.floor((to - from) / millisecondsInMin);
}

@Component({
    selector: 'app-hotel-gym-dtl',
    templateUrl: './gym-detail.component.html',
    styleUrls: ['./gym-detail.component.scss']
})
export class GymDetailComponent implements OnInit {

    readonly payModeCash = payModeCash;
    public loadingState: LoadingState;
    private saved = false;
    private accessRight: Right;
    private record: FullService;
    private dataSrc: FullServiceDataSource;
    public form: UntypedFormGroup = null;
    public agentACModel: AgentACModel;
    public agentBookings: BookedRoom[] = [];
    invoiceDetails: {
        vat: number;
        total: number;
        stamp: number;
    } = {
            vat: 0,
            total: 0,
            stamp: 0
        };

    // used ONLY as minDate for outDate
    inDate: Date;

    constructor(public gymSrv: GymService,
        private formBuilder: UntypedFormBuilder,
        public router: Router,
        public userSrv: UserService,
        public httpSrv: HttpService,
        public snackBarSrv: SnackBarService,
        public activatedRoute: ActivatedRoute,
        private confirmationSrv: ConfirmationDialogService) {
        this.dataSrc = new FullServiceDataSource(httpSrv);
        this.agentACModel = new AgentACModel(httpSrv);
        this.agentACModel.onSelection = e => {
            this.saved = false;
            this.record.service.agent = e == null ? null : e.id;
            this.fetchAgentBookings();
        };
    }

    ngOnInit(): void {
        this.loadingState = LoadingState.LOADING;
        // entity: null
        this.accessRight = this.userSrv.getRights(null);
        const id = +this.getIdFromRoute();
        const observable = this.gymSrv.load();
        if (id === 0) {
            observable.subscribe(() => {
                this.load({
                    service: {
                        time: dateTimeToStr(new Date(Date.now())),
                        centerId: this.userSrv.context.center,
                        invoiceId: null,
                        payMethod: null,
                        bookingId: null,
                        agent: null,
                        id: 0
                    },
                    details: [],
                    invoiceNumber: null
                });
            });
        } else {
            observable.pipe(
                switchMap(() => this.dataSrc.getById(id)),
                switchMap(r => r == null ? this.dataSrc.getPendingById(id) : of(r))
            ).subscribe(r => this.load(r));
        }
    }

    load(srv: FullService): void {
        this.record = srv;
        let exitDate: Date;
        if (this.record.details.length === 1) {
            exitDate = strToDateTime(this.record.service.time);
            exitDate.setMinutes(exitDate.getMinutes() + this.record.details[0].qty);
        } else {
            exitDate = srv.service.id ? new Date(Date.now()) : null;
            this.record.details = [this.newDetail(this.record.service.id)];
        }
        const outDateConf: any[] = [dateTimeToStr(exitDate)];
        const payModeConf: any[] = [this.record.service.payMethod];
        if (this.record.service.id) {
            // outDateConf.push(Validators.required);
            payModeConf.push(Validators.required);
        }
        this.setInDate(strToDateTime(this.record.service.time));
        this.form = this.formBuilder.group({
            agent: [this.record.service.agent, Validators.required],
            payMode: payModeConf,
            inDate: [this.record.service.time/*, Validators.required*/],
            outDate: outDateConf,
        });
        if (this.record.invoiceNumber || this.record.service.bookingId) {
            this.form.disable();
        }
        if (srv.service.id) {
            this.updateQty();
        }
        this.loadingState = LoadingState.COMPLETE;
    }

    getIdFromRoute(): string {
        return this.activatedRoute.snapshot.params.id;
    }

    public fetchAgentBookings(): void {
        this.agentBookings = [];
        if (this.record.service.agent != null) {
            if (this.record.service.bookingId) {
                this.httpSrv.getData<Room>(roomsByBookingUrl + '/' + this.record.service.bookingId, 0, 49)
                    .subscribe((rs: { body: Room[] }) => {
                        this.agentBookings = [{ id: -this.record.service.bookingId, rooms: rs.body.map(r => r.number).join(', ') }];
                    });
            } else {
                const today = dateTimeToStr(new Date());
                const filter = '&from' + today + '&to' + today + '&agent' + this.record.service.agent;
                this.httpSrv.getData<any>(bookingUrl, 0, 49, filter)
                    .pipe(
                        map((r: { body: any[] }) => r.body.filter(b => b.bookingState === BookingStates.CHECKED_IN).map(b => b.id)),
                        switchMap((bookingIds: number[]) => {
                            const observables: Observable<BookedRoom>[] = bookingIds.map(id =>
                                this.httpSrv.getData<Room>(roomsByBookingUrl + '/' + id, 0, 49)
                                    .pipe(
                                        map((rs: { body: Room[] }) => {
                                            return { id: -id, rooms: rs.body.map(r => r.number).join(', ') };
                                        })
                                    )
                            );
                            return forkJoin(observables);
                        }
                        )
                    ).subscribe(r => this.agentBookings = r);
            }
        }
    }

    setInDate(x: Date) {
        // used ONLY as minDate for outDate
        this.inDate = new Date(x.getTime());
        this.inDate.setSeconds(0);
        // this.inDate.setMinutes(this.inDate.getMinutes() + 1);
        this.updateQty();
    }

    private updateQty() {
        if (!this.record.service.id || !this.form) {
            return;
        }
        const from = this.inDate ? this.inDate.getTime() : 0;
        const toDate = strToDateTime(this.form.value.outDate);
        if (from === 0 || toDate == null) {
            this.record.details[0].qty = 0;
        } else {
            toDate.setSeconds(0);
            const to = toDate ? toDate.getTime() : 0;
            this.record.details[0].qty = minutesBetweenInstants(from, to);
            this.invoiceDetails.vat = calculateVAT(this.record);
            this.invoiceDetails.total = calculateTotal(this.record);
            this.invoiceDetails.total += this.invoiceDetails.vat;
            this.invoiceDetails.stamp = calculateStampFromAmount(
                this.invoiceDetails.total,
                this.record.service.payMethod
            );
        }
    }

    setPayMode(v: number): void {
        this.record.service.payMethod = v;
        this.invoiceDetails.stamp = calculateStampFromAmount(this.invoiceDetails.total + this.invoiceDetails.vat, v);
    }

    public getBookingId(): number {
        return this.record.service.payMethod < 0
            ? -1 * (this.record.service.payMethod)
            : null;
    }

    newDetail(parentId: number): ServiceDetail {
        return {
            id: 0,
            qty: 0,
            articleId: this.gymSrv.hotelOptions.gymArticleId,
            vat: this.gymSrv.vats[this.gymSrv.hotelOptions.gymVat],
            serviceId: parentId,
            discount: 0,
            price: this.gymSrv.hotelOptions.gymCost / 60
        };
    }

    public canBeDeactivated(): Observable<boolean> | boolean {
        if (this.saved) {
            return true;
        }
        return this.confirmationSrv.confirmDontSave();
    }

    close(confirm: boolean): void {
        this.saved = this.saved || !confirm;
        this.activatedRoute.queryParams.subscribe(params => {
            const cmd = params.referer;
            if (cmd) {
                this.router.navigate([cmd]);
            } else {
                this.router.navigate(['../'], { relativeTo: this.activatedRoute });
            }
        });
    }

    onSave(generateInvoice: boolean = false): void {
        if (this.form.valid) {
            const record: FullService = deepCopy(this.record);
            const value = this.form.value;
            record.service.bookingId = generateInvoice ? null : this.getBookingId();
            record.service.payMethod = value.payMode;
            record.service.agent = value.agent;
            record.service.time = value.inDate;
            record.details[0].qty = minutesBetween(value.inDate, value.outDate);
            if (record.service.payMethod < 0) {
                record.service.payMethod = null;
            }
            if (record.service.bookingId || record.service.invoiceId === 0) {
                delete record.service.invoiceId;
            }
            const saveCallback = success => {
                if (success) {
                    this.record.invoiceNumber = record.invoiceNumber;
                    this.record.service.bookingId = record.service.bookingId;
                    this.record.service.invoiceId = record.service.invoiceId;
                    this.saved = true;
                    // this.close(false);
                }
            };
            if (generateInvoice) {
                this.generateInvoice(record as DisplayableService, saveCallback);
            } else {
                this.save(record as DisplayableService, saveCallback);
            }
        }
    }

    private generateInvoice(record: DisplayableService, callback: (success: boolean) => void): void {
        if (this.accessRight.create) {
            this.subscribeAndReport(
                (this.dataSrc as FullServiceDataSource).generateInvoice(record),
                callback
            );
        } else {
            // todo: throw access denied error here
        }
    }

    public save(obj: DisplayableService, callback?: (success: boolean) => void): void {
        const id = (obj as any).id;
        if ((id && this.accessRight.edit) || (!id && this.accessRight.create)) {
            this.subscribeAndReport(this.dataSrc.save(obj), callback);
        } else {
            // todo: throw access denied error here
        }
    }

    protected subscribeAndReport(observable: Observable<boolean>, callback: (success: boolean) => void): void {
        observable.subscribe(
            r => {
                try {
                    if (r) {
                        // this.refresh();
                        if (callback != null) {
                            callback(true);
                        }
                        this.snackBarSrv.showSuccessMessage();
                        this.goBack();
                    } else {
                        if (callback != null) {
                            callback(false);
                        }
                        this.snackBarSrv.showFailureMessage();
                    }
                } catch (e) {
                    this.snackBarSrv.showFailureMessage();
                    throw e;
                }
            },
            e => {
                this.snackBarSrv.showFailureMessage(e);
                if (callback != null) {
                    callback(false);
                }
                throw e;
            }
        );
    }

    goBack(): void {
        const params = new URLSearchParams(window.location.search);
        const cmd = params.get('referer');
        if (cmd) {
            this.router.navigate([cmd]);
        } else {
            let url = this.router.url;
            const i = url.lastIndexOf('/');
            if (i > -1) {
                url = url.substring(0, i);
                this.router.navigate([url]);
            }
        }
    }

}

export class CanDeactivateService implements CanDeactivate<GymDetailComponent> {

    // tslint:disable-next-line:max-line-length
    canDeactivate(component: GymDetailComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canBeDeactivated();
    }

}
