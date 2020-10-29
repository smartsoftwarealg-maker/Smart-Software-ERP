import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ArticleService, Article} from '@ss/stock/api-article';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {Mark} from '@ss/common/api-lookup';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {LookupsService, Vat} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";

@Component({
    selector: 'ss-article-detail',
    styleUrls: ['./article-detail.component.scss'],
    templateUrl: './article-detail.component.html'
})
export class ArticleDetailComponent extends BaseEntityDetailComponent<Article> {

    marks: Mark[];
    vats: Vat[];

    constructor(
        public articleSrv: ArticleService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(articleSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_ARTICLE');
    }

    public preload(): Observable<any> {
        return this.lookupsSrv.getMarks()
            .pipe(
                tap(x => this.marks = x),
                switchMap(() => this.lookupsSrv.getVats()),
                tap(x => this.vats = x),
            );
    }

    public setupForm(a: Article) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            accountno: [a.accountno],
            description2: [a.description2, Validators.required],
            id: [a.id],
            mark: [a.mark],
            price: [a.price, Validators.compose([Validators.required, Validators.min(0.01)])],
            reference: [a.reference, Validators.required],
            appCode: [a.appCode],
            vat: [a.vat]
        });
    }

}
