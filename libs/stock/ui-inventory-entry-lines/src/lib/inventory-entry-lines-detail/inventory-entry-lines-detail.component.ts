import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_CORRECTION_IN
} from '@ss/logistics/api-transaction';

import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MaterialModule } from '@ss/common/api-common';
import { InventoryEntryLinesService } from '@ss/stock/api-inventory-entry-lines';


@Component({
    selector: 'ss-inventory-entry-lines-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './inventory-entry-lines-detail.component.html',
    standalone: true,
    imports: [MaterialModule, MatMiniFabButton, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, UiAutoCompleteComponent, MatError, CdkTextareaAutosize]
})
export class InventoryEntryLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(public detailSrv: InventoryEntryLinesService) {
        super(detailSrv, DOC_CORRECTION_IN);
    }
}
