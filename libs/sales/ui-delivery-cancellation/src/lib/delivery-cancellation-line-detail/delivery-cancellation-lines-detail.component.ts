import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_DELIVERY_CANCELLATION
} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { DeliveryCancellationLinesService } from '../delivery-cancellation-lines.service';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-delivery-cancellation-lines-detail',
    templateUrl: './delivery-cancellation-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        RouterModule,
        UiAutoCompleteComponent


    ]
})
export class DeliveryCancellationLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesService: DeliveryCancellationLinesService) {
        super(inventoryLinesService, DOC_DELIVERY_CANCELLATION);
    }
}
