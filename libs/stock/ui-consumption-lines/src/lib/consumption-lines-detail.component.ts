import {Component} from '@angular/core';
import {ConsumptionLinesService} from '@ss/stock/api-consumption-lines';
import {
    BaseTransactionLinesDetailComponent2,
    DOC_CORRECTION_IN
} from '@ss/logistics/api-transaction';


@Component({
    selector: 'ss-consumption-lines-detail',
    templateUrl: './consumption-lines-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class ConsumptionLinesDetailComponent extends BaseTransactionLinesDetailComponent2 {
    constructor(
        public detailSrv: ConsumptionLinesService) {
        super(detailSrv,  DOC_CORRECTION_IN);
    }
}
