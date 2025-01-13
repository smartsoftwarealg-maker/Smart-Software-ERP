import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_INVOICE_CANCELLATION,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-invoice-lines-detail',
    templateUrl: './invoice-cancellation-lines-detail.component.html',
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
export class InvoiceCancellationLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(public inventoryLinesService: TransactionLinesService) {
        super(inventoryLinesService, DOC_INVOICE_CANCELLATION);
    }
}
