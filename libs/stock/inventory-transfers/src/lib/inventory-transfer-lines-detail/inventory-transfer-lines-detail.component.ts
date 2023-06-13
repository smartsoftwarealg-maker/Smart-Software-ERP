import { Component } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent2, DOC_TRANSFER
} from "@ss/logistics/api-transaction";
import {TransactionLinesService} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-inventory-transfer-lines-detail',
    templateUrl: './inventory-transfer-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class InventoryTransferLinesDetailComponent extends BaseTransactionLinesDetailComponent2 {
    constructor(public inventoryLinesService: TransactionLinesService) {
        super(inventoryLinesService, DOC_TRANSFER);
    }
}
