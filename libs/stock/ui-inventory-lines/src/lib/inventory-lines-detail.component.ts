import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {LookupsService, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {
    BaseTransactionLinesDetailComponent, DOC_INVENTORY,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import {LoginService} from '@ss/common/api-common';

@Component({
    selector: 'ss-inventory-lines-detail',
    templateUrl: './inventory-lines-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class InventoryLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesService: TransactionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public override articleSrv: ArticleService,
        public override lotSrv: LotsService,
        public override lookupsSrv: LookupsService) {
        super(inventoryLinesService,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            articleSrv,
            lotSrv,
            lookupsSrv,
            'STOCK_EDIT_INVENTORY_LINES',
            DOC_INVENTORY
        );
    }
}
