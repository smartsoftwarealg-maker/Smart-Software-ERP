import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_INVOICE, TransactionLinesService
} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-invoice-lines-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './invoice-lines-detail.component.html'
})
export class InvoiceLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesService: TransactionLinesService) {
        super(inventoryLinesService, DOC_INVOICE);
    }
}
