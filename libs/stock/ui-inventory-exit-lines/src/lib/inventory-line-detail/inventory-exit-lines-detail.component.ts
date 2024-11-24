import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_CORRECTION_OUT,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError, MatHint } from '@angular/material/form-field';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '../../../../../common/ui-auto-complete/src/lib/auto-complete.component';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'ss-inventory-exit-lines-detail',
    templateUrl: './inventory-exit-lines-detail.component.html',
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
export class InventoryExitLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesSrv: TransactionLinesService) {
        super(inventoryLinesSrv, DOC_CORRECTION_OUT);
    }
}
