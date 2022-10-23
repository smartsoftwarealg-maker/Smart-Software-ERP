import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {Article, ArticleService, AVAILABLE_ARTICLES_URL} from '@ss/stock/api-article';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {LookupsService, MarkService} from '@ss/common/api-lookup';
import {HttpService, PaginatorPersistenceService} from '@ss/common/api-common';
import {ImageModel} from '@ss/common/ui-image-input';
import {Observable, of, switchMap, tap} from 'rxjs';
import {Cartline} from '@ss/sales/shopping-cart';
import {FoodCartService} from '../food-cart.service';

@Component({
  selector: 'ss-food-cart',
  templateUrl: './food-cart.component.html',
  styleUrls: ['./food-cart.component.scss']
})

export class FoodCartComponent extends BaseEntityListComponent<Article> {
    public cartTotal = 0.0;
    public lastItem: Cartline = null;

    constructor(
        private cartSrv: FoodCartService,
        public articleSrv: ArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(articleSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'LOGISTICS_SHOPPING_CART');
        this.articleSrv.setParentId(3);
    }

    override processLoadedData(data: Article[]): Observable<Article[]> {
        data.forEach(p => {
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(p.id), false);
        });
        return of(data);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setButtons([this.refreshButton, this.viewReportButton]);
    }

    addToCart(article: Article, qty: number) {
        this.lastItem = {
            id: 0,
            cartId: 0,
            reference: article.reference,
            qty: qty,
            price: article.price1,
            description: article.description2,
            validated: false
        };
        if (this.cartTotal + article.price1 <= 1000000) {
            this.cartSrv
                .addItem(this.lastItem)
                .subscribe(res => {
                    if (res.id > 0) {
                        this.snackBarSrv.showSuccessMessage();
                        this.cartTotal += article.price1;
                    } else {
                        this.snackBarSrv.showFailureMessage('COMMON_FAILURE');
                    }
                });
        } else {
            this.snackBarSrv.showFailureMessage('LOGISTICS_AMOUNT_EXCEEDED');
        }
    }
}
