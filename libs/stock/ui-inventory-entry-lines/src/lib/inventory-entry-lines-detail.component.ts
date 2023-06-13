import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent2, DOC_CORRECTION_IN,
    TransactionLinesService
} from '@ss/logistics/api-transaction';


@Component({
    selector: 'ss-inventory-entry-lines-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './inventory-entry-lines-detail.component.html'
})
export class InventoryEntryLinesDetailComponent extends BaseTransactionLinesDetailComponent2 implements OnInit, OnDestroy {
    constructor(public detailSrv: TransactionLinesService) {
        super(detailSrv, DOC_CORRECTION_IN);
    }
}
