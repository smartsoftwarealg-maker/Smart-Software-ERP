import {Component} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {
    BaseTransactionLinesDetailComponent, DOC_DELIVERY, TransactionLine,
    TransactionLinesService
} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-delivery-lines-detail',
    templateUrl: './delivery-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class DeliveryLinesDetailComponent extends BaseTransactionLinesDetailComponent {
    constructor(
        public inventoryLinesService: TransactionLinesService) {
        super(inventoryLinesService, DOC_DELIVERY);
    }

    override setupForm(b: TransactionLine): UntypedFormGroup {
        const form = super.setupForm(b);
        form.controls['qtyOrdered']?.disable();
        return form;
    }
}
