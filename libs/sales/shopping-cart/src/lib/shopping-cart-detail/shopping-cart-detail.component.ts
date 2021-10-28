import { Component, OnInit } from '@angular/core';
import {HttpService, LanguageService, LoginService, PaginationModel} from "@ss/common/api-common";
import {Cart, Cartline} from "../cartline";
import {LookupsService, MarkService} from "@ss/common/api-lookup";
import {ShoppingCartService} from "../shopping-cart.service";
import {Article, ArticleService} from "@ss/stock/api-article";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from "@ss/common/ui-default-report-component";
import {Observable, of, switchMap, tap} from 'rxjs';
import {ImageModel} from "@ss/common/ui-image-input";
import {BaseEntityListComponent} from "@ss/common/ui-base-entity";

@Component({
  selector: 'ss-shopping-cart-detail',
  templateUrl: './shopping-cart-detail.component.html',
  styleUrls: ['./shopping-cart-detail.component.scss', '../shopping-cart.component.scss']
})
export class ShoppingCartDetailComponent extends BaseEntityListComponent<Cartline> {
    public readonly pagination = PaginationModel.newInstance();
    public cartTotal = 0.0;
    public lastItem: Cartline = null;

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
        private loginSrv: LoginService,) {
        super(cartSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'LOGISTICS_SHOPPING');
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

    removeOneFromCart(item: Cartline) {
        if (item != null && item.qty > 1) {
            this.cartSrv
                .removeOneItem(item)
                .subscribe(res => {
                    if (res.count > 0) {
                        this.snackBarSrv.showSuccessMessage();
                        this.data.filter(e => e.id !== item.id);
                        item.qty -= 1;
                        this.cartTotal -= item.qty * item.price;
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
}
