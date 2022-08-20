import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {LookupsService, Store, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {
    BaseTransactionLinesDetailComponent,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import {LoginService} from '@ss/common/api-common';


@Component({
    selector: 'ss-inventory-entry-lines-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './inventory-entry-lines-detail.component.html'
})
export class InventoryEntryLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesService: TransactionLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public formBuilder: UntypedFormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: LotsService,
        public lookupsSrv: LookupsService) {
        super(inventoryLinesService,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            articleSrv,
            storeNameSrv,
            lookupsSrv,
            'STOCK_EDIT_INVENTORY_LINES_ENTRY'
        );
    }
}
