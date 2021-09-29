import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService, Store, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Article, ArticleAutocompleteModel, ArticleService} from '@ss/stock/api-article';
import {TransactionLine} from '@ss/logistics/api-transaction';
import {ReceptionLinesService} from '@ss/purchases/api-reception';


@Component({
    selector: 'ss-reception-lines-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './reception-lines-detail.component.html'
})
export class ReceptionLinesDetailComponent extends BaseEntityDetailComponent<TransactionLine> implements OnInit {

    parentId: number;
    selectedRow: TransactionLine;
    articleAutoCompleteModel  = new ArticleAutocompleteModel(this.articleSrv);
    storeAutoCompleteModel: DefaultAutoCompleteModel<Store> = new DefaultAutoCompleteModel<Store>(this.storeNameSrv);

    constructor(
        public receptionLinesService: ReceptionLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public router: Router,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: LotsService,
        public lookupsSrv: LookupsService) {
        super(receptionLinesService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv,

            'STOCK_EDIT_RECEPTION_LINES'
        );
    }


    preload(): Observable<any> {
        return this.route.queryParams
            .pipe(
                tap(p => {
                    this.parentId = +p.parent;
                    this.receptionLinesService.setParentId(this.parentId);
                    return p;
                })
            );
    }


    ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../../' + this.parentId, this.route);
    }

    finishLoading(e: TransactionLine) {
        this.selectedRow = e;
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {reference: e.reference},
            queryParamsHandling: 'merge'
        }).then();
        super.finishLoading(e);
    }

    public setupForm(b: TransactionLine) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            transacId: [this.parentId],
            reference: [b.reference],
            sourceDoc: [b.sourceDoc],
            store: [b.store],
            qtyOrdered: [{ value: b.qtyOrdered || 0.0, disabled: false }],
            qtySatisfied: [b.qtySatisfied || 0.0, Validators.required],
            qtyInvoiced: [b.qtyInvoiced || 0.0],
            qtyReturned: [b.qtyReturned || 0.0],
            price: [b.price || 0.0],
            vat: [b.vat || 0.0],
            observation: [b.observation],
            footerMemo: [b.footerMemo],
            position: [b.position],
            pprice: [b.pprice],
        });
    }
}
