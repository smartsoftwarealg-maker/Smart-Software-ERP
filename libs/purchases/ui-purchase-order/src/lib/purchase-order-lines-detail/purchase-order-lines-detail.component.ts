import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_PURCHASE_ORDER
} from '@ss/logistics/api-transaction';
import {PurchaseOrderLinesService} from '../purchase-order-lines.service';

import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'ss-order-lines-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './purchase-order-lines-detail.component.html',
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
export class PurchaseOrderLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy  {

    constructor(protected detailSrv: PurchaseOrderLinesService) {
        super(detailSrv, DOC_PURCHASE_ORDER);
    }
}
