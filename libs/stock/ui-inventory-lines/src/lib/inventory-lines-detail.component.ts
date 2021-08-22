import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService, Store, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryLinesService} from '@ss/stock/api-inventory-lines';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Article, ArticleAutocompleteModel, ArticleService} from '@ss/stock/api-article';
import {TransactionLine} from '@ss/logistics/api-transaction';


@Component({
    selector: 'ss-inventory-lines-detail',
    templateUrl: './inventory-lines-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class InventoryLinesDetailComponent extends BaseEntityDetailComponent<TransactionLine> implements OnInit {


    parentId: number;
    selectedRow : TransactionLine;
    articleAutoCompleteModel  = new ArticleAutocompleteModel(this.articleSrv);
    storeAutoCompleteModel: DefaultAutoCompleteModel<Store> = new DefaultAutoCompleteModel<Store>(this.storeNameSrv);

    constructor(
        public inventoryLinesService: InventoryLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: LotsService,
        public lookupsSrv: LookupsService) {
        super(inventoryLinesService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv,

            'STOCK_EDIT_INVENTORY_LINES'
        );
    }


    preload(): Observable<any> {
        return this.route.queryParams
            .pipe(
                tap(p => {
                    this.parentId = +p.parent;
                    this.inventoryLinesService.setParentId(this.parentId);
                    return p;
                })
            );
    }


    ngOnInit() {
        super.ngOnInit();
        // FIXME: i may have broken this too. -MuaazH
        this.shellSrv.setGoBackPath('../../' + this.parentId, this.route);
    }


    finishLoading(e: TransactionLine) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {reference: e.reference},
            queryParamsHandling: 'merge'
        }).then();
        super.finishLoading(e);
    }

    public setupForm(b: TransactionLine) {
        this.selectedRow = b;
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            transacId: [this.parentId],
            reference: [b.reference],
            sourceDoc: [b.sourceDoc],
            store: [b.store],
            qtyOrdered: [b.qtyOrdered],
            qtySatisfied: [b.qtySatisfied],
            qtyInvoiced: [b.qtyInvoiced],
            qtyReturned: [b.qtyReturned],
            price: [b.price],
            observation: [b.observation],
            footerMemo: [b.footerMemo],
            position: [b.position],
            pprice: [b.pprice],
        });
    }


}
