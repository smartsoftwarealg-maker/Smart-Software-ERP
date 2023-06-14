import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_RECEPTION,
    TransactionLinesService
} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-reception-lines-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './reception-lines-detail.component.html'
})
export class ReceptionLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(public receptionLinesSrv: TransactionLinesService) {
        super(receptionLinesSrv,  DOC_RECEPTION);
    }
}
