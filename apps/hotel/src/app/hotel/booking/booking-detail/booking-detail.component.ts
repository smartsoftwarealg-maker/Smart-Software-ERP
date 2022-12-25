import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingService, dateDiff, DetailParameters } from '../booking.service';
import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { FullBooking, FullService, Transaction } from '../../hotel-api';
import { dateToStr, LoadingState, strToDate, ymdToDmy } from '../../../common/util';
import { AgentACModel, BookingStates } from '../booking-api';
import { SnackBarService } from '../../../common/snack-bar.service';
import { Observable, of } from 'rxjs';
import { ConfirmationDialogService } from '../../../common/confirmation-dialog/confirmation-dialog.service';
import { LanguageService, isString } from '@ss/common/api-common';
import { Agent } from '../../../smart-lib/common/models';
import { HttpService } from '../../../smart-lib/common/http.service';
import { deepCopy } from '../../../smart-lib/common/util';

const foodAppCode = 12;
const foyerAppCode = 14;
const gymAppCode = 15;

const fullBookingUrl = '/hotels/fullBooking';
const bookingInvoiceUrl = '/hotels/bookingInvoice';
const fullServicesUrl = '/hotels/services/';
const optionsUrl = '/hotels/options';
const fullFoodServicesUrl = fullServicesUrl + foodAppCode;
const fullFoyerServicesUrl = fullServicesUrl + foyerAppCode;
const fullGymServicesUrl = fullServicesUrl + gymAppCode;
const transactionsUrl = '/transac/transactions';

const payModeCheck = 65;
const payModeCash = 66;

interface InvoiceDetail {
    isFooter: boolean;
    description: string;
    amount: number;
    vat: number;
    serviceId?: number;
    time?: string;
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

function calculateStamp(inv: FullService) {
    if (payModeCash === inv.service.payMethod) { // redundancy to avoid calling this.calculateVAT(inv) + this.calculateTotal(inv)
        return calculateStampFromAmount(calculateVAT(inv) + calculateTotal(inv), inv.service.payMethod);
    }
    return 0.0;
}

function calculateGeneralTotal(inv: FullService) {
    return calculateTotal(inv) + calculateVAT(inv) + calculateStamp(inv);
}


const colors: any[] = [
    { id: 0, intVal: 0x55ff00, textVal: '#55ff00' },
    { id: 1, intVal: 0xe4ffbc, textVal: '#e4ffbc' },
    { id: 2, intVal: 0xfb974a, textVal: '#fb974a' },
    { id: 3, intVal: 0xfb83d6, textVal: '#fb83d6' },
    { id: 4, intVal: 0x66b5ff, textVal: '#66b5ff' },
    { id: 5, intVal: 0x1bf8f5, textVal: '#1bf8f5' },
    { id: 6, intVal: 0xf2f16e, textVal: '#f2f16e' },
    { id: 7, intVal: 0xf1ad8f, textVal: '#f1ad8f' },
    { id: 8, intVal: 0xa3aa63, textVal: '#a3aa63' }
];

@Component({
    selector: 'app-htl-booking-detail',
    templateUrl: './booking-detail.component.html',
    styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit, OnDestroy {

    readonly colors = colors;
    record: FullBooking = {
        booking: {
            bookingState: BookingStates.UNCONFIRMED,
            bookingType: null,
            customer: null,
            color: 0,
            firstActionDate: null,
            secondActionDate: null,
            invoiceId: null,
            note: null,
            dateIn: dateToStr(new Date()),
            dateOut: null,
            id: 0
        },
        bookingRooms: [],
        disavowedServices: [],
        invoiceDate: null,
        makeRoomsDirty: false,
        paymentMode: null
    };
    // other things
    daysCnt: number;
    selectedColor = Math.floor(Math.random() * 9);
    //
    loadingState: LoadingState = LoadingState.LOADING;
    //
    agentACModel: AgentACModel;
    invoiceNumber: number;
    //
    invoiceDetails: InvoiceDetail[];
    stampValue = 0; // this does not count unless the payMode is cash.
    invoiceTotal = 0;
    payModeCheck = payModeCheck;
    payModeCash = payModeCash;
    //
    saved = false;

    constructor(public bookingSrv: BookingService,
        public httpSrv: HttpService,
        public activatedRoute: ActivatedRoute,
        public router: Router,
        private confirmationSrv: ConfirmationDialogService,
        private languageSrv: LanguageService,
        private snackBarSrv: SnackBarService) {
        this.agentACModel = new AgentACModel(httpSrv);
        this.agentACModel.onSelection = (x: Agent) => this.record.booking.customer = x == null ? null : x.id;
    }

    ngOnInit(): void {
        const parameters: DetailParameters = this.bookingSrv.getDetailParameters() || { id: +this.getIdFromRoute() };
        const observable = this.bookingSrv.loadEx();
        if (parameters.id && parameters.id > 0) {
            observable.pipe(
                switchMap(() => this.bookingSrv.getFullBookingById(parameters.id)),
                tap<any>(b => this.record = b),
                switchMap(() => this.record.booking.invoiceId
                    ? this.httpSrv.get<Transaction>(transactionsUrl + '/' + this.record.booking.invoiceId)
                    : of(null)
                )
            ).subscribe(t => {
                if (t != null) {
                    this.invoiceNumber = t.number;
                    this.record.invoiceDate = t.date;
                    this.record.paymentMode = t.salesInfo.payMode;
                }
                this.record.booking.dateIn = this.trimTime(this.record.booking.dateIn as string);
                this.record.booking.dateOut = this.trimTime(this.record.booking.dateOut as string);
                this.record.booking.firstActionDate = this.trimTime(this.record.booking.firstActionDate as string);
                this.record.booking.secondActionDate = this.trimTime(this.record.booking.secondActionDate as string);
                this.init();
                this.generateInvoiceDetails();
            }, err => {
                this.loadingState = LoadingState.ERROR;
                throw err;
            });
        } else {
            observable.subscribe(() => {
                this.record.booking.dateIn = dateToStr(parameters.from || new Date());
                this.record.booking.dateOut = dateToStr(parameters.to);
                if (parameters.room && parameters.room.id) {
                    this.record.bookingRooms.push({
                        bookingId: 0,
                        chargingCost: null,
                        guests: [],
                        id: 0,
                        roomId: parameters.room.id
                    });
                }
                this.init();
            });
        }
    }

    ngOnDestroy(): void {
        this.agentACModel.onSelection = null;
    }

    getIdFromRoute(): string {
        return this.activatedRoute.snapshot.params.id;
    }

    init(): void {
        for (let i = 0; i < 9; i++) {
            if (this.record.booking.color === colors[i].intVal) {
                this.selectedColor = i;
                break;
            }
        }
        this.updateDaysCnt();
        this.saved = !!this.record.booking.invoiceId;
        this.loadingState = LoadingState.COMPLETE;
    }

    isValid() {
        // todo: check if it really is valid
        return true;
    }

    // date related crap

    invoiceDateChanged(d: string): void {
        this.record.invoiceDate = d;
    }

    dateInChanged(d: string) {
        this.record.booking.dateIn = d;
        this.updateDaysCnt();
    }

    dateOutChanged(d: string) {
        this.record.booking.dateOut = d;
        setTimeout(() => this.updateDaysCnt());
    }

    calcDaysCnt() {
        return dateDiff(strToDate(this.record.booking.dateIn as string), strToDate(this.record.booking.dateOut as string));
    }

    updateDaysCnt() {
        this.daysCnt = this.calcDaysCnt();
        if (this.daysCnt < 1) {
            this.onDayCntChanged(1);
        }
    }

    onDayCntChanged(n: number) {
        if (isString(n)) {
            n = +n;
        }
        this.daysCnt = n < 1 ? 1 : n;
        if (this.calcDaysCnt() !== n) {
            const dateOut = strToDate(this.record.booking.dateIn as string);
            dateOut.setDate(dateOut.getDate() + n);
            this.record.booking.dateOut = dateToStr(dateOut);
        }
    }

    onBookingTypeChanged(type: number) {
        this.record.booking.bookingType = type;
        if (this.record.booking.bookingState === BookingStates.UNCONFIRMED || this.record.booking.bookingState === BookingStates.RESERVED) {
            let S = BookingStates.UNCONFIRMED;
            const btArr = this.bookingSrv.bookingMethods.filter(T => T.id === type);
            if (btArr.length === 1 && btArr[0].confirmed) {
                S = BookingStates.RESERVED;
            }
            this.record.booking.bookingState = S;
        }
    }

    onBookingStateChanged(val: number) {
        this.record.booking.bookingState = val;
        if (!this.stateRequiresFirstDate()) {
            this.record.booking.firstActionDate = null;
        }
        if (!this.stateRequiresSecondDate()) {
            this.record.booking.secondActionDate = null;
        }
    }

    onPayModeChanged(mode: number) {
        this.record.paymentMode = mode;
        if (mode === payModeCash) {
            this.stampValue = calculateStampFromAmount(this.invoiceTotal, this.record.paymentMode);
        } else {
            this.stampValue = 0;
        }
    }

    stateRequiresFirstDate() {
        switch (this.record.booking.bookingState) {
            case BookingStates.CANCELED_BY_HOTEL:
            case BookingStates.CANCELED_BY_CLIENT:
            case BookingStates.CHECKED_IN:
            case BookingStates.CHECKED_OUT:
                return true;
        }
        return false;
    }

    stateRequiresSecondDate() {
        return this.record.booking.bookingState === BookingStates.CHECKED_OUT;
    }

    isCancelled() {
        return this.record.booking.bookingState === BookingStates.CANCELED_BY_HOTEL ||
            this.record.booking.bookingState === BookingStates.CANCELED_BY_CLIENT;
    }

    isReserved() {
        return this.record.booking.bookingState === BookingStates.RESERVED;
    }

    isCheckedIn() {
        return this.record.booking.bookingState === BookingStates.CHECKED_IN;
    }

    isCheckedOut() {
        return this.record.booking.bookingState === BookingStates.CHECKED_OUT;
    }

    isUnconfirmed() {
        return this.record.booking.bookingState === BookingStates.UNCONFIRMED;
    }

    doConfirm() {
        this.record.booking.bookingState = BookingStates.RESERVED;
    }

    doCheckIn() {
        // this.record.firstActionDate = this.getToday();
        this.record.booking.firstActionDate = this.record.booking.dateIn;
        this.record.booking.bookingState = BookingStates.CHECKED_IN;
    }

    doCheckOut() {
        // this.record.secondActionDate = this.getToday();
        this.record.booking.secondActionDate = this.record.booking.dateOut;
        this.record.booking.bookingState = BookingStates.CHECKED_OUT;
    }

    getFirstDateTitle() {
        switch (this.record.booking.bookingState) {
            case BookingStates.CANCELED_BY_HOTEL:
            case BookingStates.CANCELED_BY_CLIENT:
                // return 'CANCELLATION_DATE';
                return 'HTL_BK_DATE';
            case BookingStates.CHECKED_IN:
            case BookingStates.CHECKED_OUT:
                return 'HTL_BK_CHECK_IN_DATE';
        }
        return '';
    }

    public addToInvoice(srvList: FullService[], src: string): void {
        if (!this.invoiceDetails) {
            this.invoiceDetails = [];
        }
        this.invoiceDetails.push(...srvList.map(srv => {
            const time = ymdToDmy(srv.service.time).substr(0, 16);
            return {
                isFooter: false,
                description: this.languageSrv.translate(src),
                amount: calculateTotal(srv),
                vat: calculateVAT(srv),
                serviceId: srv.service.id,
                time
            };
        }));
    }

    countGuests(): number {
        return this.record.bookingRooms.map(br => br.guests.length).reduce((a, b) => a + b, 0);
    }

    generateInvoiceDetails(): void {
        // fixme: if the room vat change, the new vat will be used. The correct value of vat should be taken from Transactions
        if (!this.record.booking.id || this.record.booking.id < 1) {
            return;
        }
        this.invoiceDetails = null;
        this.httpSrv.get<any[]>(fullFoodServicesUrl + '?bookingId=' + this.record.booking.id)
            .pipe(
                tap<FullService[]>(
                    restSrv => this.addToInvoice(restSrv, 'RESTAURANT')
                ),
                switchMap(
                    () => this.httpSrv.get<FullService[]>(fullFoyerServicesUrl + '?bookingId=' + this.record.booking.id)
                ),
                tap<FullService[]>(
                    foyerSrv => this.addToInvoice(foyerSrv, 'FOYER')
                ),
                switchMap(
                    () => this.httpSrv.get<FullService[]>(fullGymServicesUrl + '?bookingId=' + this.record.booking.id)
                ),
            )
            .subscribe(gymSrv => {
                this.addToInvoice(gymSrv, 'GYM');
                const roomVat = this.bookingSrv.vats.filter(x => x.id === this.bookingSrv.hotelOptions.roomVat)[0].value / 100.0;
                this.record.bookingRooms.forEach(br => {
                    const detail: InvoiceDetail = {
                        amount: br.chargingCost * this.daysCnt,
                        vat: br.chargingCost * roomVat * this.daysCnt,
                        isFooter: false,
                        description: this.languageSrv.translate('HTL_BK_ROOM_NO'),
                    };
                    this.bookingSrv.getRoomById(br.roomId)
                        .subscribe(r => {
                            detail.description += ' ' + r.number;
                        });
                    this.invoiceDetails.push(detail);
                });
                this.invoiceDetails.sort((a: InvoiceDetail, b: InvoiceDetail) => {
                    if (a.time == null) {
                        if (b.time != null) {
                            return -1;
                        }
                        return a.description.localeCompare(b.description);
                    }
                    if (b.time == null) {
                        return 1;
                    }
                    const n = a.time.localeCompare(b.time);
                    if (n !== 0) {
                        return n;
                    }
                    return a.description.localeCompare(b.description);
                });
                const vat = this.invoiceDetails.map(r => r.vat).reduce((a, b) => a + b, 0);
                this.invoiceDetails.push(
                    {
                        isFooter: true,
                        description: this.languageSrv.translate('HTL_VAT'),
                        amount: vat,
                        vat: null
                    }
                );
                this.invoiceDetails.push(
                    {
                        isFooter: true,
                        description: this.languageSrv.translate('HTL_TAX'),
                        amount: this.bookingSrv.hotelOptions.roomTax * this.countGuests() * this.daysCnt,
                        vat: null
                    }
                );
                this.invoiceTotal = this.invoiceDetails.map(r => r.amount).reduce((a, b) => a + b, 0);
                this.stampValue = calculateStampFromAmount(this.invoiceTotal, this.record.paymentMode);
            });
    }

    trimTime(datetime: string): string {
        if (datetime) {
            if (isString(datetime)) {
                const i = datetime.indexOf(' ');
                if (i) {
                    return datetime.substr(0, i);
                }
            } else {
                return datetime;
            }
        }
        return null;
    }

    // save
    save(): void {
        this.record.booking.color = this.colors[this.selectedColor].intVal;
        if (!this.isValid()) {
            return;
        }
        const record = deepCopy(this.record);
        if (this.record.booking.id > 0) {
            this.httpSrv.put(fullBookingUrl, record)
                .subscribe(() => {
                    this.record.disavowedServices = [];
                    this.snackBarSrv.showSuccessMessage();
                    this.generateInvoiceDetails();
                    this.close(false);
                }, err => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                });
        } else {
            this.httpSrv.post(fullBookingUrl, record).subscribe(res => {
                this.record.booking.id = res.id;
                this.close(false);
                this.snackBarSrv.showSuccessMessage();
            }, err => {
                this.snackBarSrv.showFailureMessage();
                throw err;
            });
        }
    }

    public onGenerateInvoice(): void {
        if (!this.isValid()) {
            return;
        }
        const rec = this.record;
        this.httpSrv.post(bookingInvoiceUrl, rec)
            .subscribe(res => {
                const r = res;
                this.invoiceNumber = r._2.number;
                this.record.booking.invoiceId = r._1.id;
                this.snackBarSrv.showSuccessMessage();
            }, err => {
                this.snackBarSrv.showFailureMessage();
                throw err;
            });
    }

    close(confirm: boolean): void {
        this.saved = !confirm || !!this.invoiceNumber;
        this.activatedRoute.queryParams.subscribe(params => {
            const cmd = params.referer;
            if (cmd) {
                this.router.navigate([cmd]);
            } else {
                this.router.navigate(['../'], { relativeTo: this.activatedRoute });
            }
        });
    }

    /* disavowed services related crap */
    disavow(sid: number, b: boolean) {
        if (!this.record.disavowedServices) {
            this.record.disavowedServices = [];
        }
        if (b) {
            this.record.disavowedServices = this.record.disavowedServices.filter(i => i !== sid);
        } else {
            this.record.disavowedServices.push(sid);
        }
    }

    /* Save confirmation */

    public canBeDeactivated(): Observable<boolean> | boolean {
        if (this.saved) {
            return true;
        }
        return this.confirmationSrv.confirmDontSave();
    }

}

export class CanDeactivateService implements CanDeactivate<BookingDetailComponent> {

    // tslint:disable-next-line:max-line-length
    canDeactivate(component: BookingDetailComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canBeDeactivated();
    }

}
