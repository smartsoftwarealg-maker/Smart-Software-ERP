import {Component} from '@angular/core';
import {ConsumptionLinesService} from '@ss/stock/api-consumption-lines';
import {
    BaseTransactionLinesDetailComponent, DOC_CONSUMPTION, TransactionLine
} from '@ss/logistics/api-transaction';
import { UntypedFormGroup } from '@angular/forms';


@Component({
    selector: 'ss-consumption-lines-detail',
    templateUrl: './consumption-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class ConsumptionLinesDetailComponent extends BaseTransactionLinesDetailComponent {
    constructor(
        public detailSrv: ConsumptionLinesService) {
        super(detailSrv,  DOC_CONSUMPTION);
    }

    setupForm(b: TransactionLine): UntypedFormGroup {
        const form = super.setupForm(b);
        form.controls['qtyOrdered'].disable();
        return form;
    }
}
