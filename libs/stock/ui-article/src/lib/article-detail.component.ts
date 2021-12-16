import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {Article, ArticleService} from '@ss/stock/api-article';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable, zip} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {ClassService, LookupsService, Mark, Unit, Vat} from '@ss/common/api-lookup';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {ImageModel} from '@ss/common/ui-image-input';
import {HttpService} from '@ss/common/api-common';

@Component({
    selector: 'ss-article-detail',
    styleUrls: ['./article-detail.component.scss'],
    templateUrl: './article-detail.component.html'
})
export class ArticleDetailComponent extends BaseEntityDetailComponent<Article> implements OnInit {
    imageModel: ImageModel;
    aid = 0;
    classLookup = new DefaultAutoCompleteModel(this.classSrv);

    marks: Mark[];
    vats: Vat[];
    units: Unit[];
    selectedRow: Article;

    constructor(
        public articleSrv: ArticleService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private classSrv: ClassService,
        public httpSrv: HttpService,
        public router: Router) {
        super(articleSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_ARTICLE');
        this.imageModel = new ImageModel(this.httpSrv);
    }


    public preload(): Observable<any> {
        return zip(this.lookupsSrv.getMarks(),
            this.lookupsSrv.getUnits(),
            this.lookupsSrv.getVats())
            .pipe(tap(res => {
                this.marks = res[0];
                this.units = res[1];
                this.vats = res[2];
            }));
    }

    finishLoading(e: Article) {
        super.finishLoading(e);
        this.selectedRow = e;
    }

    public setupForm(a: Article) {
        // Make sure to update the template if you edit the configuration here
        this.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(a.id), false);
        this.aid = a.id;
        return this.formBuilder.group({
            description2: [a.description2, Validators.required],
            id: [a.id],
            mark: [a.mark],
            klass: [a.klass],
            salesUnit: [a.salesUnit],
            price1: [a.price1, Validators.compose([Validators.required, Validators.min(0.01)])],
            reference: [a.reference, Validators.required],
            appCode: [a.appCode],
            notForSale: [a.notForSale || false, Validators.required],
            vat: [a.vat]
        });
    }

    uploadAttachments(id: number): Observable<any> {
        this.imageModel.setBackendUrl(this.articleSrv.getPhotoUrl(id));
        return this.imageModel.submit('file');
    }
}
