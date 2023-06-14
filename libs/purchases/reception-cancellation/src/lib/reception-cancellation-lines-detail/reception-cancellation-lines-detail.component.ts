import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent,
    DOC_RECEPTION_CANCELLATION,
    TransactionLinesService
} from "@ss/logistics/api-transaction";

@Component({
    selector: 'ss-reception-cancellation-lines-detail',
    templateUrl: './reception-cancellation-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class ReceptionCancellationLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public receptionLinesSrv: TransactionLinesService) {
        super(receptionLinesSrv, DOC_RECEPTION_CANCELLATION);
    }
}

