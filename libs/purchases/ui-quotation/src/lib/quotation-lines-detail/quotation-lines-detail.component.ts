import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {LookupsService, Store, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {
    BaseTransactionLinesDetailComponent, BaseTransactionLinesDetailComponent2, DOC_QUOTATION,
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
export class QuotationLinesDetailComponent extends BaseTransactionLinesDetailComponent2 implements OnInit, OnDestroy {

    constructor(public  detailSrv: OfferLinesService) {
        super(detailSrv, DOC_QUOTATION);
    }
}
