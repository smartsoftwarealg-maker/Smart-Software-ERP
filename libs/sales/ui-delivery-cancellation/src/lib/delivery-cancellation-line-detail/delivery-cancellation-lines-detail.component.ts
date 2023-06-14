import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_DELIVERY_CANCELLATION,
    TransactionLinesService
} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-delivery-cancellation-lines-detail',
    templateUrl: './delivery-cancellation-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class DeliveryCancellationLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesService: TransactionLinesService) {
        super(inventoryLinesService, DOC_DELIVERY_CANCELLATION);
    }
}
