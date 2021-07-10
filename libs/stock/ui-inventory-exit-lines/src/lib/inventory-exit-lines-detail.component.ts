import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService, Lot, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryExitLine, InventoryExitLinesService} from '@ss/stock/api-inventory-exit-lines';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Article, ArticleService} from '@ss/stock/api-article';
import {TransactionLine} from "@ss/logistics/api-transaction";


@Component({
    selector: 'ss-inventory-exit-lines-detail',
    templateUrl: './inventory-exit-lines-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class InventoryExitLinesDetailComponent extends BaseEntityDetailComponent<InventoryExitLine> implements OnInit {


    parentId: number;
    selectedRow: InventoryExitLine;

    articleAutoCompleteModel: DefaultAutoCompleteModel<Article> = new DefaultAutoCompleteModel<Article>(this.articleSrv, 'reference', 'description2');
    storeAutoCompleteModel: DefaultAutoCompleteModel<Lot> = new DefaultAutoCompleteModel<Lot>(this.storeNameSrv);

    constructor(
        public inventoryExitLinesService: InventoryExitLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: LotsService,
        public lookupsSrv: LookupsService) {
        super(inventoryExitLinesService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv,

            'STOCK_EDIT_INVENTORY_LINES_EXIT'
        );
    }


    preload(): Observable<any> {
        return this.route.queryParams
            .pipe(
                tap(p => {
                    this.parentId = +p.parent;
                    this.inventoryExitLinesService.setParentId(this.parentId);
                    return p;
                })
            );
    }


    ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../../' + this.parentId, this.route, {id: this.parentId});
    }

    finishLoading(e: TransactionLine) {
        super.finishLoading(e);
        this.selectedRow = e;
    }


    public setupForm(b: InventoryExitLine) {
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
