import { Component, OnInit } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_TRANSFER
} from "@ss/logistics/api-transaction";
import {TransactionLinesService} from '@ss/logistics/api-transaction';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {LookupsService, LotsService} from '@ss/common/api-lookup';

@Component({
    selector: 'ss-inventory-transfer-lines-detail',
    templateUrl: './inventory-transfer-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class InventoryTransferLinesDetailComponent extends BaseTransactionLinesDetailComponent {
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
            'STOCK_TRANSFERS',
            DOC_TRANSFER
        );
    }
}
