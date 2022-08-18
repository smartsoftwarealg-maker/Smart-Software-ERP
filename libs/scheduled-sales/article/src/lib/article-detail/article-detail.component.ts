import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ImageModel} from '@ss/common/ui-image-input';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {ClassService, LookupsService, Mark, TypeService, Unit, Vat, VatService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {HttpService} from '@ss/common/api-common';
import {Observable, pipe, zip} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Article, SSArticleService} from '@ss/scheduled-sales/api-scheduled-sales';

@Component({
  selector: 'ss-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent  extends BaseEntityDetailComponent<Article> implements OnInit {
    imageModel: ImageModel;
    aid = 0;
    classLookup = new DefaultAutoCompleteModel(this.classSrv);
    typeLookup = new DefaultAutoCompleteModel(this.typeSrv);

    vats: Vat[];
    selectedRow: Article;

    constructor(
        public articleSrv: SSArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private classSrv: ClassService,
        private typeSrv: TypeService,
        private vatSrv: VatService,
        public httpSrv: HttpService,
        public router: Router) {
        super(articleSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_ARTICLE');
        this.imageModel = new ImageModel(this.httpSrv);
    }


    override finishLoading(e: Article) {
        super.finishLoading(e);
        this.selectedRow = e;
    }

    public setupForm(a: Article) {
        // this.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(a.id), false);
        this.aid = a.id;
        return this.formBuilder.group({
            description2: [a.description2, Validators.required],
            id: [a.id],
            pClass: [a.pClass],
            aType: [a.aType],
            price1: [a.price1 || 0],
            discount: [a.discount || 0],
            appId: [1],
            blocked: [a.blocked || false],
            discountable: [a.discountable || false],
            accountNo: [a.accountNo],
            rgb: [a.rgb || 0],
            reference: [a.reference, Validators.required],
            vat: [a.vat]
        });
    }

    public override preload(): Observable<any> {
        return this.lookupsSrv.getVats()
            .pipe(tap(res => this.vats = res));
    }
}
