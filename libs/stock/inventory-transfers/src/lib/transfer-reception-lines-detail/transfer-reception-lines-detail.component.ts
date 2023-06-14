import { Component } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_TRANSFER_RECEPTION
} from "@ss/logistics/api-transaction";
import {TransactionLinesService} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-transfer-reception-lines-detail',
    templateUrl: './transfer-reception-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class TransferReceptionLinesDetailComponent  extends BaseTransactionLinesDetailComponent {
    constructor(public inventoryLinesService: TransactionLinesService) {
        super(inventoryLinesService, DOC_TRANSFER_RECEPTION);
    }
}
