import {Component} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent,
    DOC_PURCHASE_ORDER
} from '@ss/logistics/api-transaction';
import {PurchaseRequestLinesService} from '../purchase-request-lines.service';

@Component({
    selector: 'ss-purchase-request-lines-detail',
    templateUrl: './purchase-request-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class PurchaseRequestLinesDetailComponent extends BaseTransactionLinesDetailComponent {

    constructor(public detailSrv: PurchaseRequestLinesService) {
        super(detailSrv,  DOC_PURCHASE_ORDER);
    }
}
