import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { Article, ArticleService, AVAILABLE_ARTICLES_URL } from '@ss/master-data/api-article';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { LookupsService, MarkService } from '@ss/common/api-lookup';
import { HttpService, MaterialModule, PaginationModel, PaginatorPersistenceService } from '@ss/common/api-common';
import { ImageInputComponent, ImageModel } from '@ss/common/ui-image-input';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { Cartline } from '../cartline';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { SalesUiDeliveryLinesModule } from '@ss/sales/ui-delivery-lines';
import { LogisticsUiDocImportModule } from '@ss/logistics/ui-doc-import';
import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,

        SalesUiDeliveryLinesModule,
        LogisticsUiDocImportModule,
        UiStockInfoComponent,
        ImageInputComponent,
        PaginationComponent
    ]

})
export class ShoppingCartComponent extends BaseEntityListComponent<Article> {
    // public readonly pagination = PaginationModel.newInstance();
    public cartTotal = 0.0;
    public lastItem: Cartline = null;

    constructor(
        private markSrv: MarkService,
        private cartSrv: ShoppingCartService,
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
        this.articleSrv.setUrl(AVAILABLE_ARTICLES_URL);
    }

    override processLoadedData(data: Article[]): Observable<Article[]> {
        data.forEach(p => {
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(p.id), false);
        });
        return this.markSrv
            .getByIdList(data.filter(e => e.mark && e.mark > 0).map(e => e.mark).join(','))
            .pipe(
                tap(res => data.forEach(a => a.markDescription = res.find(e => e.id === a.mark)?.description)),
                switchMap(res => this.cartSrv.getTotal()),
                tap(res => this.cartTotal = res.total),
                switchMap(res => of(data))
            );
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
