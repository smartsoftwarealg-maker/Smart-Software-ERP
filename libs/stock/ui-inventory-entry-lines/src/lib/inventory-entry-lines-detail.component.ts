import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {LookupsService, StoreName, StoreNameService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {InventoryEntryLines, InventoryEntryLinesService} from "@ss/stock/api-inventory-entry-lines";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";
import {Article, ArticleService} from "@ss/stock/api-article";
import {DETAIL_URL} from "@ss/common/api-common";
import {InventoryLines} from "@ss/stock/api-inventory-lines";


@Component({
    selector: 'ss-inventory-entry-lines-detail',
    styleUrls: ['./inventory-entry-lines-detail.component.scss'],
    templateUrl: './inventory-entry-lines-detail.component.html'
})
export class InventoryEntryLinesDetailComponent extends BaseEntityDetailComponent<InventoryEntryLines> {


    parentId: number;

    articleAutoCompleteModel: DefaultAutoCompleteModel<Article> = new DefaultAutoCompleteModel<Article>(this.articleSrv, 'reference', 'description2');
    storeAutoCompleteModel: DefaultAutoCompleteModel<StoreName> = new DefaultAutoCompleteModel<StoreName>(this.storeNameSrv);

    constructor(
        public inventoryEntryLinesService: InventoryEntryLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: StoreNameService,
        public lookupsSrv: LookupsService) {
        super(inventoryEntryLinesService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv,

            'STOCK_EDIT_INVENTORY_LINES_ENTRY'
        );
    }


    preload(): Observable<any> {
        return this.route.queryParams
            .pipe(
                tap(p => {
                    this.parentId = +p.parent;
                    this.inventoryEntryLinesService.setParentId(this.parentId);
                    return p;
                })
            );
    }


    ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../' + DETAIL_URL, this.route, {id: this.parentId});
    }

    finishLoading(e: InventoryLines) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {reference: e.reference},
            queryParamsHandling: 'merge'
        }).then();
        super.finishLoading(e);
    }

    public setupForm(b: InventoryEntryLines) {
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
