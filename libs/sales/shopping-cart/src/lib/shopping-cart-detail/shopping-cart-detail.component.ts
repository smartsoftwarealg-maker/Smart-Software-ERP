import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService, LanguageService, LoginService, PaginationModel} from "@ss/common/api-common";
import {Cart, Cartline} from "../cartline";
import {LookupsService, MarkService} from "@ss/common/api-lookup";
import {ShoppingCartService} from "../shopping-cart.service";
import {Article, ArticleService} from "@ss/stock/api-article";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from "@ss/common/ui-default-report-component";
import {Observable, of, Subscription, switchMap, tap} from 'rxjs';
import {ImageModel} from "@ss/common/ui-image-input";
import {BaseEntityListComponent} from "@ss/common/ui-base-entity";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'ss-shopping-cart-detail',
  templateUrl: './shopping-cart-detail.component.html',
  styleUrls: ['./shopping-cart-detail.component.scss', '../shopping-cart.component.scss']
})
export class ShoppingCartDetailComponent extends BaseEntityListComponent<Cartline> {
    private subscription: Subscription = null;
    private isHandset: Observable<BreakpointState> = null;
    public readonly pagination = PaginationModel.newInstance();
    public cartTotal = 0.0;
    public lastItem: Cartline = null;
    public isSmallScreen = false;

    private LONG = [
        'image',
        'reference',
        'description2',
        'qty',
        'price',
        'total',
        'actions',
    ];
    private SHORT = [
        'description2',
        'qty',
        'price',
    ];
    displayedColumns = this.LONG;

    constructor(
        private markSrv: MarkService,
        private cartSrv: ShoppingCartService,
        public articleSrv: ArticleService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public langSrv: LanguageService,
        private loginSrv: LoginService,
        private breakPointObs: BreakpointObserver) {
        super(cartSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'LOGISTICS_SHOPPING');
        this.isHandset = this.breakPointObs.observe(['(max-width: 700px)']);
    }

    processLoadedData(data: Cartline[]): Observable<Cartline[]> {
        data.forEach(p => {
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(p.partId), false);
        })

        return this.cartSrv.getTotal()
            .pipe(tap(res => this.cartTotal = res.total),
                  switchMap(res => of(data)));
    }

    ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setButtons([this.refreshButton, this.viewReportButton]);
        this.isHandset.subscribe(state => {
            this.isSmallScreen = state.matches;
            this.displayedColumns =  this.isSmallScreen? this.SHORT : this.LONG;
        });
    }

    removeFromCart(item: Cartline) {
        if (item) {
            this.cartSrv
                .removeItem(item)
                .subscribe(res => {
                    if (res.count > 0) {
                        this.snackBarSrv.showSuccessMessage();
                        this.data = this.data.filter(e => e.id !== item.id);
                        this.cartTotal -= item.qty * item.price;
                    } else {
                        this.snackBarSrv.showFailureMessage();
                    }
                });
        }
    }

    addToCart(item: Cartline, qty: number) {
        if (item != null && item.qty + qty > 0) {
            this.cartSrv
                .addQty(item, qty)
                .subscribe(res => {
                    if (res.count > 0) {
                        this.snackBarSrv.showSuccessMessage();
                        this.data.filter(e => e.id !== item.id);
                        item.qty += qty;
                        this.cartTotal += qty * item.price;
                    } else {
                        this.snackBarSrv.showFailureMessage();
                    }
                });
        }
    }

    confirm(confirmed: boolean) {
        const dirty = !confirmed;
        if (this.data.length > 0) {
            const l: Cartline = this.data[0];
            const cart: Cart = {
                id: l.cartId,
                centerId: this.loginSrv.appCtx.center,
                agentId: this.loginSrv.appCtx.agentId,
                shopDate: new Date(),
                validated: dirty,
                processed: false,
            };
            this.cartSrv
                .confirm(cart)
                .subscribe(res => {
                    if (res.count > 0) {
                        this.snackBarSrv.showSuccessMessage();
                        l.dirty = dirty;
                    } else {
                        this.snackBarSrv.showFailureMessage();
                    }
                });
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
