import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {LookupsService, StoreName, StoreNameService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {InventoryExitLines, InventoryExitLinesService} from "@ss/stock/api-inventory-exit-lines";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";
import {Article, ArticleService} from "@ss/stock/api-article";
import {DETAIL_URL} from "@ss/common/api-common";


@Component({
    selector: 'ss-inventory-exit-lines-detail',
    styleUrls: ['./inventory-exit-lines-detail.component.scss'],
    templateUrl: './inventory-exit-lines-detail.component.html'
})
export class InventoryExitLinesDetailComponent extends BaseEntityDetailComponent<InventoryExitLines> {


    parentId: number;

    articleAutoCompleteModel: DefaultAutoCompleteModel<Article> = new DefaultAutoCompleteModel<Article>(this.articleSrv);
    storeAutoCompleteModel: DefaultAutoCompleteModel<StoreName> = new DefaultAutoCompleteModel<StoreName>(this.storeNameSrv);

    constructor(
        public InventoryExitLinesService: InventoryExitLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: StoreNameService,
        public lookupsSrv: LookupsService) {
        super(InventoryExitLinesService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv,

            'STOCK_EDIT_INVENTORY_LINES_EXIT'
        );
    }


    preload(): Observable<any> {
        return this.route.queryParams
            .pipe(
                tap(p => {
                    this.parentId = +p.parent;
                    this.InventoryExitLinesService.setParentId(this.parentId);
                    return p;
                })
            );
    }


    ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../' + DETAIL_URL, this.route, {id: this.parentId});
    }

    public setupForm(b: InventoryExitLines) {
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
