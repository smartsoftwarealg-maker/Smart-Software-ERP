import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent,
    DOC_RECEPTION_CANCELLATION,
    TransactionLinesService
} from "@ss/logistics/api-transaction";

import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'ss-reception-cancellation-lines-detail',
    templateUrl: './reception-cancellation-lines-detail.component.html',
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
    CdkTextareaAutosize
],
})
export class ReceptionCancellationLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public receptionLinesSrv: TransactionLinesService) {
        super(receptionLinesSrv, DOC_RECEPTION_CANCELLATION);
    }
}

