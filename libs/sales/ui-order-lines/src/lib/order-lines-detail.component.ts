import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_SALES_ORDER, OfferLinesService
} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-order-lines-detail',
    templateUrl: './order-lines-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class OrderLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(public inventoryLinesService: OfferLinesService) {
        super(inventoryLinesService, DOC_SALES_ORDER);
    }
}
