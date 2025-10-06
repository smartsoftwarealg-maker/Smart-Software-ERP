import { Component, inject, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {Article, ArticleService} from '@ss/master-data/api-article';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {
    ArticleTypeService,
    ClassService,
    LookupsService,
    MarkService, SubclassService,
    UnitService,
    Vat,
    VatService
} from '@ss/common/api-lookup';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { ImageInputComponent, ImageModel } from '@ss/common/ui-image-input';
import {HttpService, IsParamService, MaterialModule} from '@ss/common/api-common';

import {TranslateDirective, TranslatePipe} from '@ss/common/ui-lang';
import { ArticleStoreComponent } from '@ss/stock/article-store';
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
    selector: 'ss-article-detail',
    styleUrls: ['./article-detail.component.scss'],
    templateUrl: './article-detail.component.html',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        TranslateDirective,
        ImageInputComponent,
        UiAutoCompleteComponent,
        ArticleStoreComponent,
        TranslatePipe
    ]
})
export class ArticleDetailComponent extends BaseEntityDetailComponent<Article> implements OnInit {
    private isParamSrv = inject(IsParamService);
    private subClassSrv =  inject(SubclassService);
    private classSrv =  inject(ClassService);
    private markSrv  =  inject(MarkService);
    private unitSrv  =  inject(UnitService);
    private vatSrv   = inject(VatService);
    private typeSrv  = inject(ArticleTypeService);

    imageModel: ImageModel;
    aid = 0;

    isSODISMAC = toSignal(this.isParamSrv.is('SODISMAC'));
    classLookup = new DefaultAutoCompleteModel(this.classSrv);
    subClassLookup = new DefaultAutoCompleteModel(this.subClassSrv);
    unitLookup = new DefaultAutoCompleteModel(this.unitSrv);
    purchaseUnitLookup = new DefaultAutoCompleteModel(this.unitSrv);
    markLookup = new DefaultAutoCompleteModel(this.markSrv);
    typeLookup = new DefaultAutoCompleteModel(this.typeSrv);

    vats: Vat[];
    selectedRow: Article;

    constructor(
        public articleSrv: ArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public router: Router) {
        super(articleSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_ARTICLE');
        this.imageModel = new ImageModel(this.httpSrv);
    }


    public override preload(): Observable<Vat[]> {
        return this.lookupsSrv.getVats().pipe(tap(res => this.vats = res));
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
            purchaseUnit: [a.purchaseUnit],
            price1:       [a.price1 || 0],
            reference:    [a.reference, Validators.required],
            appId:        [a.appId || this.articleSrv.getParentId()],
            notForSale:   [a.notForSale || false, Validators.required],
            vat:          [a.vat],
            vat2:         [a.vat2],
            blocked:      [a.blocked],
            articleType:  [a.articleType],
            subClass:     [a.subClass],
            info:         [a.info],
        });
    }

    override uploadAttachments(id: number): Observable<any> {
        this.imageModel.setBackendUrl(this.articleSrv.getPhotoUrl(id));
        return this.imageModel.submit('file');
    }
}
