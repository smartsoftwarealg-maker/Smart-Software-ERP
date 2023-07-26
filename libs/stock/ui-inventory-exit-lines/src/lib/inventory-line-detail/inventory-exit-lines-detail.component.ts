import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_CORRECTION_OUT,
    TransactionLinesService
} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-inventory-exit-lines-detail',
    templateUrl: './inventory-exit-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class InventoryExitLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesSrv: TransactionLinesService) {
        super(inventoryLinesSrv, DOC_CORRECTION_OUT);
    }
}
