import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent,
    DOC_RECEPTION,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '../../../../../common/ui-auto-complete/src/lib/auto-complete.component';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'ss-import-reception-lines-detail',
    templateUrl: './import-reception-lines-detail.component.html',
    styleUrls: ['./import-reception-lines-detail.component.scss',
        '../../../../../common/assets/src/assets/transac-lines-detail.scss'],
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
        CdkTextareaAutosize,
    ],
})
export class ImportReceptionLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(protected receptionLinesSrv: TransactionLinesService) {
        super(receptionLinesSrv, DOC_RECEPTION);
    }
}
