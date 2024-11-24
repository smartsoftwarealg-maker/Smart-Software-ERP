import {Component} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent,
    DOC_PURCHASE_ORDER
} from '@ss/logistics/api-transaction';
import {PurchaseRequestLinesService} from '../purchase-request-lines.service';
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
    selector: 'ss-purchase-request-lines-detail',
    templateUrl: './purchase-request-lines-detail.component.html',
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
        MatError,
        UiAutoCompleteComponent,
        CdkTextareaAutosize,
    ],
})
export class PurchaseRequestLinesDetailComponent extends BaseTransactionLinesDetailComponent {

    constructor(public detailSrv: PurchaseRequestLinesService) {
        super(detailSrv,  DOC_PURCHASE_ORDER);
    }
}
