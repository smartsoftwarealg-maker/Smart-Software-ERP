import {Component} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent,
    DOC_CONSUMPTION_CANCELLATION
} from '@ss/logistics/api-transaction';
import { ConsumptionCancellationLinesService } from '@ss/stock/api-consumption-lines';

import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError, MatHint } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';


@Component({
    selector: 'ss-cancellation-consumption-lines-detail',
    templateUrl: './consumption-cancellation-lines-detail.component.html',
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
    CdkTextareaAutosize
],
})
export class ConsumptionCancellationLinesDetailComponent extends BaseTransactionLinesDetailComponent {
    constructor(public detailSrv: ConsumptionCancellationLinesService) {
        super(detailSrv,  DOC_CONSUMPTION_CANCELLATION);
    }
}
