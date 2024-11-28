import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_DELIVERY_CANCELLATION,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';


import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { LogisticsUiDocImportModule } from '@ss/logistics/ui-doc-import';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { DeliveryCancellationLinesService } from '../delivery-cancellation-lines.service';

@Component({
    selector: 'ss-delivery-cancellation-lines-detail',
    templateUrl: './delivery-cancellation-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,

        LogisticsUiDocImportModule,
        DocInfoComponent
    ],
})
export class DeliveryCancellationLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesService: DeliveryCancellationLinesService) {
        super(inventoryLinesService, DOC_DELIVERY_CANCELLATION);
    }
}
