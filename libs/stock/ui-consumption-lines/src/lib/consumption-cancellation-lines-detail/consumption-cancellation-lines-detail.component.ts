import {Component} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent,
    DOC_CONSUMPTION_CANCELLATION
} from '@ss/logistics/api-transaction';
import { ConsumptionCancellationLinesService } from '@ss/stock/api-consumption-lines';


@Component({
    selector: 'ss-cancellation-consumption-lines-detail',
    templateUrl: './consumption-cancellation-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class ConsumptionCancellationLinesDetailComponent extends BaseTransactionLinesDetailComponent {
    constructor(public detailSrv: ConsumptionCancellationLinesService) {
        super(detailSrv,  DOC_CONSUMPTION_CANCELLATION);
    }
}
