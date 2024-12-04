import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseTransactionLinesDetailComponent, DOC_QUOTATION} from "@ss/logistics/api-transaction";
import {OfferLinesService} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-quotation-lines-detail',
    templateUrl: './quotation-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        RouterModule,
        UiAutoCompleteComponent
    ],
})
export class QuotationLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {

    constructor(public  detailSrv: OfferLinesService) {
        super(detailSrv, DOC_QUOTATION);
    }
}
