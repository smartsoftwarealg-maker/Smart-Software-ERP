import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {LookupsService, Store, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {LoginService} from '@ss/common/api-common';
import {
    BaseTransactionLinesDetailComponent,
    TransactionLinesService
} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-invoice-lines-detail',
    templateUrl: './invoice-cancellation-lines-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class InvoiceCancellationLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesService: TransactionLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public formBuilder: FormBuilder,
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
            'SALES_EDIT_INVOICE_LINES'
        );
    }
}
