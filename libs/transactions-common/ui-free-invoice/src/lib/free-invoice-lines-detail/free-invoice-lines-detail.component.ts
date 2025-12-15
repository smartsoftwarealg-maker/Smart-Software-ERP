import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_INVOICE
} from '@ss/logistics/api-transaction';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError, MatHint } from '@angular/material/form-field';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MaterialModule } from '@ss/common/api-common';
import {FreeInvoiceLinesService} from "../invoice-lines.service";

@Component({
    selector: 'ss-free-invoice-lines-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './free-invoice-lines-detail.component.html',
    standalone: true,
    imports: [MaterialModule, MatMiniFabButton, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, UiAutoCompleteComponent, MatError, MatHint, CdkTextareaAutosize, TranslatePipe]
})
export class FreeInvoiceLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesService: FreeInvoiceLinesService) {
        super(inventoryLinesService, DOC_INVOICE);
    }
}
