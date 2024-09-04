import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_QUOTATION
} from "@ss/logistics/api-transaction";
import {OfferLinesService} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { RouterModule } from '@angular/router';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { LogisticsUiStockInfoModule } from '@ss/logistics/ui-stock-info';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@Component({
    selector: 'ss-quotation-lines-detail',
    templateUrl: './quotation-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiStockInfoModule,
        DocInfoComponent
    ],
})
export class QuotationLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {

    constructor(public  detailSrv: OfferLinesService) {
        super(detailSrv, DOC_QUOTATION);
    }
}
