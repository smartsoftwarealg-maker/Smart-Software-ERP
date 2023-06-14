import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_PURCHASE_ORDER
} from '@ss/logistics/api-transaction';
import {PurchaseOrderLinesService} from '../purchase-order-lines.service';

@Component({
    selector: 'ss-order-lines-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './purchase-order-lines-detail.component.html',
})
export class PurchaseOrderLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy  {

    constructor(protected detailSrv: PurchaseOrderLinesService) {
        super(detailSrv, DOC_PURCHASE_ORDER);
    }
}
