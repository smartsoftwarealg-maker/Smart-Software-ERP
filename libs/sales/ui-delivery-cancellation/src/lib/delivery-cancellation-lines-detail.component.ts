import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from '@ss/stock/api-article';
import {LookupsService, Store, LotsService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {
    BaseTransactionLinesDetailComponent,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import {LoginService} from '@ss/common/api-common';

@Component({
  selector: 'ss-delivery-cancellation-lines-detail',
  templateUrl: './delivery-cancellation-lines-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class DeliveryCancellationLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesService: TransactionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public override articleSrv: ArticleService,
        public override storeNameSrv: LotsService,
        public override lookupsSrv: LookupsService) {
        super(inventoryLinesService,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            articleSrv,
            storeNameSrv,
            lookupsSrv,
            'SALES_EDIT_CANCELLATION_LINES');
    }
}
