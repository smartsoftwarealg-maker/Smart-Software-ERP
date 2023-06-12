import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, BaseTransactionLinesDetailComponent2,
    DOC_RECEPTION_CANCELLATION,
    TransactionLinesService
} from "@ss/logistics/api-transaction";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {LookupsService, LotsService} from '@ss/common/api-lookup';

@Component({
    selector: 'ss-reception-cancellation-lines-detail',
    templateUrl: './reception-cancellation-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class ReceptionCancellationLinesDetailComponent extends BaseTransactionLinesDetailComponent2 implements OnInit, OnDestroy {
    constructor(
        public receptionLinesSrv: TransactionLinesService) {
        super(receptionLinesSrv, DOC_RECEPTION_CANCELLATION);
    }
}

