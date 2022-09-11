import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {LookupsService, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {
    BaseTransactionLinesDetailComponent,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import {PurchaseOrderLinesService} from './purchase-order-lines.service';

@Component({
  selector: 'ss-order-lines-detail',
  styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
  templateUrl: './purchase-order-lines-detail.component.html',
})
export class PurchaseOrderLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy  {

    constructor(
        public detailSrv: PurchaseOrderLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: LotsService,
        public lookupsSrv: LookupsService) {
        super(detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            articleSrv,
            storeNameSrv,
            lookupsSrv,
            'PURCHASES_EDIT_ORDER_LINES');
    }
}
