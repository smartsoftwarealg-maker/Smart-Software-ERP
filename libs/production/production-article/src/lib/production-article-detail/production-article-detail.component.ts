import { Component, inject, OnInit, signal } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { Article, ARTICLE_FINAL_PRODUCT, ARTICLE_SEMI_FINAL, ArticleService } from '@ss/master-data/api-article';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {
    ArticleTypeService,
    ClassService,
    LookupsService,
    MarkService, SubclassService,
    UnitService,
    Vat
} from '@ss/common/api-lookup';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { ImageInputComponent, ImageModel } from '@ss/common/ui-image-input';
import { HttpService, MaterialModule } from '@ss/common/api-common';

import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ArticleStoreComponent } from '@ss/stock/article-store';
import { ChildBomComponent } from '@ss/master-data/ui-article';
import { BomService } from '@ss/master-data/ui-article';
import { DosageUnitService } from '../services/dosage-unit.service';
import { PackagingUnitService } from '../services/packaging-unit.service';
import { ProductTypeService } from '../services/product-type.service';
import { ChildAttributesComponent } from '@ss/custom-attributes';

@Component({
    selector: 'ss-production-article-detail',
    styleUrls: ['./production-article-detail.component.scss'],
    templateUrl: './production-article-detail.component.html',
    standalone: true,
    imports: [
    MaterialModule,
    RouterModule,
    TranslateDirective,
    ImageInputComponent,
    UiAutoCompleteComponent,
    ArticleStoreComponent,
    TranslatePipe,
    ChildBomComponent,
    ChildAttributesComponent
]
})
export class ProductionArticleDetailComponent
    extends BaseEntityDetailComponent<Article>
    implements OnInit {
    private subClassSrv = inject(SubclassService);
    private classSrv = inject(ClassService);
    private markSrv = inject(MarkService);
    private unitSrv = inject(UnitService);
    private typeSrv = inject(ArticleTypeService);
    private bomSrv = inject(BomService);
    private dosageUnitSrv = inject(DosageUnitService);
    private packagingUnitSrv=inject(PackagingUnitService);
    private productTypeSrv = inject(ProductTypeService);

    imageModel: ImageModel;
    aid = 0;

    classLookup = new DefaultAutoCompleteModel(this.classSrv);
    subClassLookup = new DefaultAutoCompleteModel(this.subClassSrv);
    unitLookup = new DefaultAutoCompleteModel(this.unitSrv);
    purchaseUnitLookup = new DefaultAutoCompleteModel(this.unitSrv);
    markLookup = new DefaultAutoCompleteModel(this.markSrv);
    typeLookup = new DefaultAutoCompleteModel(this.typeSrv);
    dosageUnitLookup = new DefaultAutoCompleteModel(this.dosageUnitSrv);
    packagingUnitLookup = new DefaultAutoCompleteModel(this.packagingUnitSrv);
    productTypeLookup = new DefaultAutoCompleteModel(this.productTypeSrv);


    vats: Vat[];
    selectedRow: Article;
    hasBoom = signal(false);

    constructor(
        public entitySrv: ArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public router: Router,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'STOCK_EDIT_ARTICLE',
        );
        this.imageModel = new ImageModel(this.httpSrv);
        this.productTypeLookup.onObjectSelected = t => this.hasBoom.set(t?.id === ARTICLE_SEMI_FINAL || t?.id === ARTICLE_FINAL_PRODUCT);
    }

    public override preload(): Observable<Vat[]> {
        return this.lookupsSrv.getVats().pipe(tap((res) => (this.vats = res)));
    }

    override finishLoading(e: Article) {
        super.finishLoading(e);
        this.selectedRow = e;
    }

    public override setupForm(a: Article) {
        // Make sure to update the template if you edit the configuration here
        this.imageModel.setImageUrl(this.entitySrv.getPhotoUrl(a.id), false);
        this.aid = a.id;
        this.bomSrv.setParentId(a.id);
        this.hasBoom.set(a?.productType === ARTICLE_SEMI_FINAL || a?.productType === ARTICLE_FINAL_PRODUCT);
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
            appId:        [a.appId || this.entitySrv.getParentId()],
            notForSale:   [a.notForSale || false, Validators.required],
            vat:          [a.vat],
            vat2:         [a.vat2],
            blocked:      [a.blocked],
            articleType:  [a.articleType],
            subClass:     [a.subClass],
            dosageUnit:   [a.dosageUnit],
            packaging:    [a.packaging],
            productType:  [a.productType]
        });
    }

    override uploadAttachments(id: number): Observable<any> {
        this.imageModel.setBackendUrl(this.entitySrv.getPhotoUrl(id));
        return this.imageModel.submit('file');
    }
}
