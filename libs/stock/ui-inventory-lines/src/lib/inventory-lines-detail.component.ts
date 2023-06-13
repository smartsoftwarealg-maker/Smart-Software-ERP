import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent2, DOC_INVENTORY,
    TransactionLinesService
} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-inventory-lines-detail',
    templateUrl: './inventory-lines-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class InventoryLinesDetailComponent extends BaseTransactionLinesDetailComponent2 implements OnInit, OnDestroy {
    constructor(public inventoryLinesSrv: TransactionLinesService) {
        super(inventoryLinesSrv,  DOC_INVENTORY );
    }
}
