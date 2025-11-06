import { Component } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_TRANSFER
} from "@ss/logistics/api-transaction";
import {TransactionLinesService} from '@ss/logistics/api-transaction';

import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError, MatHint } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {MaterialModule} from '@ss/common/api-common';

@Component({
    selector: 'ss-inventory-transfer-lines-detail',
    templateUrl: './inventory-transfer-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    standalone: true,
    imports: [
        MaterialModule,
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
export class InventoryTransferLinesDetailComponent extends BaseTransactionLinesDetailComponent {
    constructor(public inventoryLinesService: TransactionLinesService) {
        super(inventoryLinesService, DOC_TRANSFER);
    }
}
