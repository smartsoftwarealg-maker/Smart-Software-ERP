import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_INVOICE
} from '@ss/logistics/api-transaction';
import { InvoiceLinesService } from '@ss/sales/api-invoice';

@Component({
    selector: 'ss-invoice-lines-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './invoice-lines-detail.component.html'
})
export class InvoiceLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesService: InvoiceLinesService) {
        super(inventoryLinesService, DOC_INVOICE);
    }
}
