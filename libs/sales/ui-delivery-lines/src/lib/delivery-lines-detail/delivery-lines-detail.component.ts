import {Component} from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    BaseTransactionLinesDetailComponent, DOC_DELIVERY, TransactionLine
} from '@ss/logistics/api-transaction';
import { DeliveryLinesService } from '@ss/sales/api-delivery';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError, MatHint } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'ss-delivery-lines-detail',
    templateUrl: './delivery-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    standalone: true,
    imports: [
        NgIf,
        MatMiniFabButton,
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        UiAutoCompleteComponent,
        MatError,
        MatHint,
        CdkTextareaAutosize,
    ],
})
export class DeliveryLinesDetailComponent extends BaseTransactionLinesDetailComponent {
    constructor(
        public inventoryLinesService: DeliveryLinesService) {
        super(inventoryLinesService, DOC_DELIVERY);
    }

    override setupForm(b: TransactionLine): UntypedFormGroup {
        const form = super.setupForm(b);
        form.controls['qtyOrdered']?.disable();
        return form;
    }
}
