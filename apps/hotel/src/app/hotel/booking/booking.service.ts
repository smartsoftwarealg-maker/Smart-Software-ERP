import { Injectable } from '@angular/core';
import { BookingMethod, BookingState, ChargingCost, FullBooking, PaymentMethod, Room, RoomOption, RoomState, RoomType } from '../hotel-api';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';
import { Vat } from '../../common/vat/vat-api';
import { AutoCompleteModel } from '../../common/auto-complete/auto-complete-model';
import { HotelOptions } from '../options/options';
import { HttpService } from '../../smart-lib/common/http.service';
import { isNumber } from '@ss/common/api-common';

export interface DetailParameters {
    id?: number;
    room?: Room;
    from?: Date;
    to?: Date;
}

export function dateDiff(first: Date, last: Date) {
    if (first == null || last == null) {
        return 0;
    }
    last.setHours(0); // just in case
    first.setHours(0); // just in case
    return Math.round((last.getTime() - first.getTime()) / 86400000);
}

export interface ListFilters {
    firstDay: Date;
    roomsFilter: UntypedFormControl;
    selectedAgentId: number;
    selectedRoomType: number;
    selectedRoomOptions: number[];
}

const roomTypesUrl = '/hotels/roomTypes';
const roomStatesUrl = '/hotels/roomStates';
const roomOptionsUrl = '/hotels/roomOptions';
const roomsUrl = '/hotels/rooms';
const vatsUrl = '/articles/vats';
const hotelOptionsUrl = '/hotels/options';
// noinspection SpellCheckingInspection
const payMethodsUrl = '/paymethods';
const chargingCostsUrl = '/hotels/chargingCosts';
const bookingStatesUrl = '/hotels/bookingStates';
const bookingMethodsUrl = '/hotels/bookingTypes';
const fullBookingUrl = '/hotels/fullBooking';

// const agentsUrl = '/agents';

function filterRooms(httpSrv: HttpService, page: number, pageSize: number,
    filter?: string, type?: number, options?: number[], agentId?: number): Observable<{ body: Room[], itemCount: number }> {
    let filterStr = '';
    if (filter != null) {
        filterStr += filter;
    }
    if (type != null && type > 0) {
        filterStr += '&type' + type;
    }
    if (options != null && options.length > 0) {
        filterStr += '&options' + options.join(',');
    }
    if (agentId != null && agentId > 0) {
        filterStr += '&agent' + agentId;
    }
    return httpSrv.getData<Room>(roomsUrl, page, pageSize, filterStr);
}

@Injectable()
export class BookingService {

    readonly maxCacheAge = 60 * 1000; // 60 seconds
    nextUpdate = 0;
    nextUpdateEx = 0;

    public roomTypes: { [key: number]: string; };
    public roomStates: { [key: number]: string; };
    public roomOptions: { [key: number]: string; };
    public roomTypesArray: RoomType[];
    public roomStatesArray: RoomState[];
    public roomOptionsArray: RoomOption[];
    //
    vats: Vat[] = [];
    hotelOptions: HotelOptions;
    paymentMethods: PaymentMethod[] = [];
    chargingCosts: ChargingCost[];
    bookingStates: BookingState[];
    bookingMethods: BookingMethod[];
    roomsCache: { [key: number]: Room; } = {};
    //
    private detailParameters: DetailParameters = null;
    //
    public listFilters: ListFilters = {
        firstDay: null,
        roomsFilter: new UntypedFormControl(),
        selectedAgentId: null,
        selectedRoomType: 0,
        selectedRoomOptions: []
    };

    constructor(public httpSrv: HttpService) {
    }

    /**
     * returns of(null) when data is already loaded
     */
    public load(reload: boolean = false): Observable<any> {
        if (Date.now() < this.nextUpdate && !reload) {
            return of(null);
        }
        this.roomStates = null;
        this.roomTypes = null;
        this.roomOptions = null;
        return this.httpSrv.getData<RoomState>(roomStatesUrl, 0, 49)
            .pipe(
                map((r: { body: RoomState[] }) => r.body),
                tap((states: RoomState[]) => {
                    this.roomStates = {};
                    states.forEach(s => this.roomStates[s.id] = s.description);
                    this.roomStatesArray = states;
                }),
                switchMap(() => this.httpSrv.getData<RoomType>(roomTypesUrl, 0, 49)),
                map((r: { body: RoomType[] }) => r.body),
                tap((types: RoomType[]) => {
                    this.roomTypes = {};
                    types.forEach(t => this.roomTypes[t.id] = t.description);
                    this.roomTypesArray = types;
                }),
                switchMap(() => this.httpSrv.getData<RoomOption>(roomOptionsUrl, 0, 49)),
                map((r: { body: RoomOption[] }) => r.body),
                tap((options: RoomOption[]) => {
                    this.roomOptions = {};
                    options.forEach(t => this.roomOptions[t.id] = t.description);
                    this.roomOptionsArray = options;
                    this.nextUpdate = Date.now() + this.maxCacheAge;
                })
            );
    }

    public loadEx(reload: boolean = false): Observable<any> {
        const now = Date.now();
        if (now < this.nextUpdateEx && !reload) {
            return this.load(reload);
        }
        this.roomsCache = {};
        return this.load(reload)
            .pipe(
                switchMap(() => this.httpSrv.getData<Vat>(vatsUrl, 0, 49)),
                tap((vats: { body: Vat[] }) => this.vats = vats.body),
                switchMap(() => this.httpSrv.getData<PaymentMethod>(payMethodsUrl, 0, 49)),
                tap((methods: { body: PaymentMethod[] }) => this.paymentMethods = methods.body),
                switchMap(() => this.httpSrv.getData<ChargingCost>(chargingCostsUrl, 0, 49)),
                tap((costs: { body: ChargingCost[] }) => this.chargingCosts = costs.body),
                switchMap(() => this.httpSrv.getData<BookingState>(bookingStatesUrl, 0, 49)),
                tap((states: { body: BookingState[] }) => this.bookingStates = states.body),
                switchMap(() => this.httpSrv.getData<BookingMethod>(bookingMethodsUrl, 0, 49)),
                tap((methods: { body: BookingMethod[] }) => this.bookingMethods = methods.body),
                switchMap(() => this.httpSrv.get<HotelOptions>(hotelOptionsUrl)),
                tap((options: HotelOptions) => {
                    this.hotelOptions = options;
                    this.nextUpdateEx = Date.now() + this.maxCacheAge;
                })
            );
    }

    public getFullBookingById(id: number): Observable<FullBooking> {
        return this.httpSrv.get<FullBooking>(fullBookingUrl + '/' + id);
    }

    public loadRooms(page: number, pageSize: number, filter?: string,
        type?: number, options?: number[], agentId?: number): Observable<{ body: Room[], itemCount: number }> {
        return filterRooms(this.httpSrv, page, pageSize, filter, type, options, agentId);
    }

    public getRoomById(id: number): Observable<Room> {
        if (this.roomsCache[id]) {
            return of(this.roomsCache[id]);
        }
        return this.httpSrv.get<Room>(roomsUrl + '/' + id)
            .pipe(tap((r: Room) => this.roomsCache[r.id] = r));
        // return this.httpSrv.get<Room>(roomsUrl + '/' + id)
        //     .pipe(
        //         tap<Room>(r => this.roomsCache[r.id] = r)
        //     );
    }

    public setDetailParameters(param: DetailParameters): void {
        this.detailParameters = param;
    }

    public getDetailParameters(): DetailParameters {
        const l = this.detailParameters;
        this.detailParameters = null;
        return l;
    }

}

export class RoomACModel extends AutoCompleteModel<Room, number> {

    options: number[] = [];
    roomType: number;

    constructor(private httpSrv: HttpService, private bookingSrv: BookingService) {
        super();
    }

    filter(filter: string): Observable<Room[]> {
        const options = this.options && this.options.length > 0 ? this.options : null;
        const type = !this.roomType || this.roomType < 0 ? null : this.roomType;
        return filterRooms(this.httpSrv, 0, 5, filter, type, options)
            .pipe(map(r => r.body));
    }

    filterArray(filter: string, objects: Room[]): Room[] {
        return objects.filter(s => !filter || (s.number + '').startsWith(filter));
    }

    getById(id: number): Observable<Room> {
        return this.bookingSrv.getRoomById(id);
    }

    idOf(obj: Room): number {
        return obj ? obj.id : null;
    }

    isId(obj: number | Room): boolean {
        return isNumber(obj);
    }

    public toString(obj: Room): string {
        return obj ? obj.number : null;
    }
}
