import {Component} from '@angular/core';
import {ConsumptionLinesService} from '@ss/stock/api-consumption-lines';
import {
    BaseTransactionLinesDetailComponent, DOC_CONSUMPTION, TransactionLine
} from '@ss/logistics/api-transaction';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError, MatHint } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';


@Component({
    selector: 'ss-consumption-lines-detail',
    templateUrl: './consumption-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    standalone: true,
    imports: [
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
export class ConsumptionLinesDetailComponent extends BaseTransactionLinesDetailComponent {
    constructor(
        public detailSrv: ConsumptionLinesService) {
        super(detailSrv,  DOC_CONSUMPTION);
    }

    setupForm(b: TransactionLine): UntypedFormGroup {
        const form = super.setupForm(b);
        form.controls['qtyOrdered'].disable();
        return form;
    }
}
