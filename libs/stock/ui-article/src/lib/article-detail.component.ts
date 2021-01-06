import {Component, OnInit} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ArticleService, Article} from '@ss/stock/api-article';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Mark, StoreName} from '@ss/common/api-lookup';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {LookupsService, Vat} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {AutoCompleteModel} from "@ss/common/ui-auto-complete";
import {ArticleStoreService} from "@ss/stock/api-article-store";

@Component({
    selector: 'ss-article-detail',
    styleUrls: ['./article-detail.component.scss'],
    templateUrl: './article-detail.component.html'
})
export class ArticleDetailComponent extends BaseEntityDetailComponent<Article> implements OnInit {

    marks: Mark[];
    vats: Vat[];
    storeAutoCompleteModel: AutoCompleteModel<StoreName> = new AutoCompleteModel<StoreName>(this.storeSrv);
    selectedStore: number;
    storeForm: FormGroup;

    constructor(
        public articleSrv: ArticleService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public router: Router,
        public storeSrv: ArticleStoreService) {
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


    loadEntity(id: number): Observable<Article> {
        this.initStoreForm(id);
        return super.loadEntity(id);
    }

    initStoreForm(articleId: number) {
        this.storeSrv.setParentId(articleId); // set the article for the store
        this.storeForm = new FormGroup({
            store: new FormControl(+this.route.snapshot.queryParamMap.get('store'))
        });
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

    updateStoreId(id: number): void {
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: {store: id},
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            });
    }
}
