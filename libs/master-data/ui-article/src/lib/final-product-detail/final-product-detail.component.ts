import { Component, inject, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {Article} from '@ss/master-data/api-article';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable, zip} from 'rxjs';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import { ClassService, LookupsService, MarkService, Unit, Vat } from '@ss/common/api-lookup';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiImageInputModule, ImageModel } from '@ss/common/ui-image-input';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { StockUiArticleStoreModule } from '@ss/stock/article-store';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { LogisticsUiStockInfoModule } from '@ss/logistics/ui-stock-info';
import { FinalProductService } from '@ss/master-data/api-article';
import { CMMSRoutingService } from '@ss/master-data/cmms-routing';
import { BomService } from "../bom.service";

@Component({
    selector: 'ss-article-detail',
    styleUrls: ['./final-product-detail.component.scss'],
    templateUrl: './final-product-detail.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        StockUiArticleStoreModule,
        LogisticsUiDocInfoModule,
        RouterModule,
        CommonUiImageInputModule,
        CommonUiAutoCompleteModule,
        LogisticsUiStockInfoModule
    ],
})
export class FinalProductDetailComponent extends BaseEntityDetailComponent<Article> implements OnInit {
    private routingSrv = inject(CMMSRoutingService);
    private classSrv =  inject(ClassService);
    private markSrv = inject(MarkService);
    private bomSrv = inject(BomService);

    imageModel: ImageModel;
    aid = 0;
    classLookup = new DefaultAutoCompleteModel(this.classSrv);
    routingLookup = new DefaultAutoCompleteModel(this.routingSrv);
    markLookup = new DefaultAutoCompleteModel(this.markSrv);

    vats: Vat[];
    units: Unit[];
    selectedRow: Article;

    constructor(
        public articleSrv: FinalProductService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public router: Router) {
        super(articleSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_FINAL_PRODUCTS');
        this.imageModel = new ImageModel(this.httpSrv);
    }


    public override preload(): Observable<any> {
        return this.lookupsSrv.getVats().pipe(tap(res => this.vats = res));
    }

    loadEntity(id: number): Observable<Article> {
        this.bomSrv.setParentId(id);
        return super.loadEntity(id);
    }

    override finishLoading(e: Article) {
        super.finishLoading(e);
        this.selectedRow = e;
    }

    public override setupForm(a: Article) {
        // Make sure to update the template if you edit the configuration here
        this.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(a.id), false);
        this.aid = a.id;
        return this.formBuilder.group({
            description2: [a.description2, Validators.required],
            id:           [a.id],
            mark:         [a.mark],
            maxQty:       [a.maxQty],
            minQty:       [a.minQty],
            klass:        [a.klass],
            salesUnit:    [a.salesUnit],
            price1:       [a.price1 || 0],
            reference:    [a.reference, Validators.required],
            appId:        [a.appId || this.articleSrv.getParentId()],
            notForSale:   [a.notForSale || false, Validators.required],
            vat:          [a.vat],
            routingId:    [a.routingId],
            blocked:      [a.blocked]
        });
    }

    override uploadAttachments(id: number): Observable<any> {
        this.imageModel.setBackendUrl(this.articleSrv.getPhotoUrl(id));
        return this.imageModel.submit('file');
    }
}
