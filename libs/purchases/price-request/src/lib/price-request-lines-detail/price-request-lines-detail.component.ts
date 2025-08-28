import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_PRICE_INQUIRY, DOC_PURCHASE_ORDER
} from '@ss/logistics/api-transaction';

import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { PriceRequestLinesService } from '../services/price-request-lines.service';

@Component({
    selector: 'ss-price-request-lines-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './price-request-lines-detail.component.html',
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
export class PriceRequestLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy  {

    constructor(protected detailSrv: PriceRequestLinesService) {
        super(detailSrv, DOC_PRICE_INQUIRY);
    }
}
