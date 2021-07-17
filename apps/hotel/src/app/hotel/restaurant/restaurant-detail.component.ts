import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestaurantService } from './restaurant.service';
import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { ConfirmationDialogService } from '../../common/confirmation-dialog/confirmation-dialog.service';
import { map, switchMap } from 'rxjs/operators';
import { Food, FullService, Room } from '../hotel-api';
import { AbstractEntityView } from '../../common/base-classes/abstract-entity-view';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { SnackBarService } from '../../common/snack-bar.service';
import { dateTimeToStr, LoadingState } from '../../common/util';
import { AgentACModel, BookingStates, FullServiceDataSource } from './restaurant-api';
import { UserService } from '../../smart-lib/components/login/user.service';
import { HttpService } from '../../smart-lib/common/http.service';
import { deepCopy } from '../../smart-lib/common/util';

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

// function calculateStamp(inv: FullService) {
//     if (payModeCash === inv.service.payMethod) { // redundancy to avoid calling this.calculateVAT(inv) + this.calculateTotal(inv)
//         return calculateStampFromAmount(calculateVAT(inv) + calculateTotal(inv), inv.service.payMethod);
//     }
//     return 0.0;
// }

// function calculateGeneralTotal(inv: FullService) {
//     return calculateTotal(inv) + calculateVAT(inv) + calculateStamp(inv);
// }


@Component({
    selector: 'app-restaurant-dtl',
    templateUrl: './restaurant-detail.component.html',
    styleUrls: ['./restaurant-detail.component.scss']
})
// tslint:disable-next-line:max-line-length
export class RestaurantDetailComponent extends AbstractEntityView<FullService, BackendDataSource<FullService>> implements OnInit, OnDestroy {

    private savingState: LoadingState = LoadingState.COMPLETE;
    readonly payModeCash = payModeCash;
    private saved: boolean;
    record: FullService;
    agentACModel: AgentACModel;

    public agentBookings: BookedRoom[] = [];

    invoiceDetails: {
        vat: number;
        total: number;
        stamp: number;
        details: { description: string; amount: string; articleId: number }[]
    };

    activeFoodType: number;
    menu: Food[] = [];

    constructor(public restSrv: RestaurantService,
        public router: Router,
        public userSrv: UserService,
        public httpSrv: HttpService,
        public snackBarSrv: SnackBarService,
        public activatedRoute: ActivatedRoute,
        private confirmationSrv: ConfirmationDialogService) {
        // entity: null
        super(
            new FullServiceDataSource(httpSrv),
            userSrv.getRights(null),
            snackBarSrv
        );
        this.agentACModel = new AgentACModel(httpSrv);
        this.agentACModel.onSelection = e => {
            this.saved = false;
            this.record.service.agent = e == null ? null : e.id;
            this.fetchAgentBookings();
        };
    }

    ngOnInit(): void {
        const entity = this.restSrv.activeEntity;
        this.restSrv.activeEntity = null;
        //
        const observable: Observable<any> = this.restSrv.load();
        const routeId = this.getIdFromRoute();
        if (entity == null || (entity.service.id + '') !== routeId) {
            if (routeId === '0') {
                observable.subscribe(() => this.load({
                    service: {
                        agent: null,
                        bookingId: null,
                        centerId: this.userSrv.context.center,
                        id: 0,
                        invoiceId: null,
                        payMethod: null,
                        time: null
                    },
                    details: []
                }),
                    err => {
                        this.loadingState = LoadingState.ERROR;
                        throw err;
                    }
                );
            } else {
                observable.pipe(
                    switchMap(() => this.dataSrc.getById(this.getIdFromRoute()))
                ).subscribe(
                    e => this.load(e),
                    err => {
                        this.loadingState = LoadingState.ERROR;
                        throw err;
                    }
                );
            }
        } else {
            observable.subscribe(
                () => this.load(entity),
                err => {
                    this.loadingState = LoadingState.ERROR;
                    throw err;
                }
            );
        }
    }

    ngOnDestroy(): void {
        this.agentACModel.onSelection = null;
    }

    getIdFromRoute(): string {
        return this.activatedRoute.snapshot.params.id;
    }

    public canBeDeactivated(): Observable<boolean> | boolean {
        if (this.saved) {
            return true;
        }
        return this.confirmationSrv.confirmDontSave();
    }

    load(s: FullService): void {
        this.record = s;
        this.updateInvoice();
        this.saved = !!this.record.service.invoiceId || !!this.record.service.bookingId;
        this.filterFoodMenu((this.restSrv.foodTypes[0] || { id: 0 }).id);
        if (this.record.service.bookingId) {
            this.record.service.payMethod = -this.record.service.bookingId;
        }
        this.fetchAgentBookings();
        this.loadingState = LoadingState.COMPLETE;
    }

    filterFoodMenu(type: number) {
        this.activeFoodType = type;
        this.menu = this.restSrv.food.filter(f => f.foodType === type);
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

    updateInvoice(): void {
        let total = calculateTotal(this.record);
        const vat = calculateVAT(this.record);
        total += vat;
        const stamp = calculateStampFromAmount(total, this.record.service.payMethod);
        this.invoiceDetails = {
            details: this.record.details.map(d => {
                return {
                    description: this.restSrv.foodIndex[d.articleId].description2,
                    qty: d.qty,
                    amount: d.qty.toFixed(0) + ' � ' + d.price.toFixed(2),
                    articleId: d.articleId
                };
            }),
            total,
            vat,
            stamp
        };
    }

    // ui anim shit
    toggleMenu() {
        const inv = document.getElementById('food-invoice');
        const menu = document.getElementById('food-menu');
        inv.classList.toggle('rest-hidden');
        menu.classList.toggle('rest-fullscreen');
    }

    // events... and that sort of thing

    setPayMode(v: number): void {
        this.record.service.payMethod = v;
        this.invoiceDetails.stamp = calculateStampFromAmount(this.invoiceDetails.total, this.record.service.payMethod);
        this.saved = false;
    }

    addItem(f: Food): void {
        this.saved = false;
        const detail = this.record.details.filter(d => d.articleId === f.id)[0];
        if (detail) {
            detail.qty++;
        } else {
            this.record.details.push({
                id: 0,
                qty: 1,
                articleId: f.id,
                price: f.price,
                discount: 0,
                serviceId: this.record.service.id,
                vat: f.vat ? this.restSrv.vats[f.vat] : 0
            });
        }
        this.updateInvoice();
    }

    removeItem(id: number): void {
        this.saved = false;
        this.record.details = this.record.details.map(d => {
            if (d.articleId === id) {
                d.qty--;
            }
            return d;
        }).filter(d => d.qty > 0);
        this.updateInvoice();
    }

    // form stuff

    isFormValid() {
        return this.record.details.length > 0
            && this.record.service.payMethod !== null
            && this.record.service.agent !== null;
    }

    canInvoiceBeGenerated() {
        return this.record.service.payMethod > 0
            && this.canBeSaved();
    }

    canBeSaved() {
        // && this.hotelInvoice.invoiceNumber == null
        return this.loadingState === LoadingState.COMPLETE
            && this.savingState === LoadingState.COMPLETE
            && this.record.service.agent
            && this.record.service.payMethod
            && !this.record.invoiceNumber
            && !this.record.service.bookingId
            && this.isFormValid();
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
                        map((r: any) => r.body.filter(b => b.bookingState === BookingStates.CHECKED_IN).map(b => b.id)),
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

    public getBookingId(): number {
        return this.record.service.payMethod < 0
            ? -1 * (this.record.service.payMethod)
            : null;
    }

    onSave(generateInvoice: boolean = false): void {
        if (this.savingState !== LoadingState.COMPLETE) {
            return;
        }
        this.savingState = LoadingState.LOADING;
        if (this.isFormValid()) {
            if (!this.record.service.id) {
                this.record.service.time = dateTimeToStr(new Date(Date.now()));
            }
            const record: FullService = deepCopy(this.record);
            record.service.bookingId = generateInvoice ? null : this.getBookingId();
            if (record.service.payMethod < 0) {
                record.service.payMethod = null;
            }
            if (record.service.bookingId || record.service.invoiceId === 0) {
                delete record.service.invoiceId;
            }
            const saveCallback = success => {
                if (success) {
                    this.saved = true;
                    this.record.invoiceNumber = record.invoiceNumber;
                    this.record.service.bookingId = record.service.bookingId;
                    this.record.service.invoiceId = record.service.invoiceId;
                    // this.close(false);
                }
                this.savingState = LoadingState.COMPLETE;
            };
            if (generateInvoice) {
                this.generateInvoice(record, saveCallback);
            } else {
                this.save(record, saveCallback);
            }
        } else {
            this.savingState = LoadingState.COMPLETE;
        }
    }

    private generateInvoice(record: FullService, callback: (success: boolean) => void): void {
        if (this.accessRight.create) {
            this.subscribeAndReport(
                (this.dataSrc as FullServiceDataSource).generateInvoice(record),
                callback
            );
        } else {
            // todo: throw access denied error here
        }
    }

}

export class CanDeactivateService implements CanDeactivate<RestaurantDetailComponent> {

    // tslint:disable-next-line:max-line-length
    canDeactivate(component: RestaurantDetailComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canBeDeactivated();
    }

}
