import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {LookupsService, Store, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {
    BaseTransactionLinesDetailComponent, DOC_QUOTATION,
    TransactionLine,
    TransactionLinesService
} from "@ss/logistics/api-transaction";
import {LoginService} from "@ss/common/api-common";
import {OfferLinesService} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-quotation-lines-detail',
    templateUrl: './quotation-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class QuotationLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {

    constructor(
        public override detailSrv: OfferLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public override articleSrv: ArticleService,
        public override lotSrv: LotsService,
        public override lookupsSrv: LookupsService) {
        super(detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            articleSrv,
            lotSrv,
            lookupsSrv,
            'PURCHASES_QUOTATION',
            DOC_QUOTATION);
    }
}
