import {Component, OnInit} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {Article, ArticleService} from '@ss/stock/api-article';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LookupsService, Mark, Store, LotsService, Vat} from '@ss/common/api-lookup';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";

@Component({
    selector: 'ss-article-detail',
    styleUrls: ['./store-detail.component.scss'],
    templateUrl: './store-detail.component.html'
})
export class StoreDetailComponent extends BaseEntityDetailComponent<Article> implements OnInit {

    marks: Mark[];
    vats: Vat[];
    selectedRow: Article;

    constructor(
        public articleSrv: ArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public router: Router) {
        super(articleSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_ARTICLE');
    }


    public override preload(): Observable<any> {
        return this.lookupsSrv.getMarks()
            .pipe(
                tap(x => this.marks = x),
                switchMap(() => this.lookupsSrv.getVats()),
                tap(x => this.vats = x),
            );
    }


    override finishLoading(e: Article) {
        super.finishLoading(e);
        this.selectedRow = e;
    }

    public override setupForm(a: Article) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            accountno: [a.accountno],
            description2: [a.description2, Validators.required],
            id: [a.id],
            mark: [a.mark],
            price1: [a.price1, Validators.compose([Validators.required, Validators.min(0.01)])],
            reference: [a.reference, Validators.required],
            appId: [a.appId],
            vat: [a.vat]
        });
    }

}
