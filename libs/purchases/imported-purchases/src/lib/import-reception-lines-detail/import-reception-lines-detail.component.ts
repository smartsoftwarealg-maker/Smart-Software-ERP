import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent,
    DOC_RECEPTION,
    TransactionLinesService
} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-import-reception-lines-detail',
    templateUrl: './import-reception-lines-detail.component.html',
    styleUrls: ['./import-reception-lines-detail.component.scss',
        '../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class ImportReceptionLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(protected receptionLinesSrv: TransactionLinesService) {
        super(receptionLinesSrv, DOC_RECEPTION);
    }
}
