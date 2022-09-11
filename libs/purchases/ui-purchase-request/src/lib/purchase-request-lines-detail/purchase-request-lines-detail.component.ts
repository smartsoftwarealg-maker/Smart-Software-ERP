import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseTransactionLinesDetailComponent, TransactionLinesService} from '@ss/logistics/api-transaction';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {LookupsService, LotsService} from '@ss/common/api-lookup';
import {PurchaseRequestLinesService} from '../purchase-request-lines.service';

@Component({
    selector: 'ss-purchase-request-lines-detail',
    templateUrl: './purchase-request-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class PurchaseRequestLinesDetailComponent extends BaseTransactionLinesDetailComponent {

    constructor(
        public override detailSrv: PurchaseRequestLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public override articleSrv: ArticleService,
        public override storeNameSrv: LotsService,
        public override lookupsSrv: LookupsService) {
        super(detailSrv,
              shellSrv,
              snackBarSrv,
              route,
              formBuilder,
              confirmationSrv,
              articleSrv,
              storeNameSrv,
              lookupsSrv,
              'PURCHASES_PURCHASE_REQUEST');
    }
}
