import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_RECEPTION, TransactionLine
} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

import { LogisticsUiStockInfoModule } from '@ss/logistics/ui-stock-info';
import { RouterOutlet } from '@angular/router';
import { ReceptionLinesService } from '../reception-lines.service';

@Component({
    selector: 'ss-reception-lines-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './reception-lines-detail.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,

        LogisticsUiStockInfoModule,
        RouterOutlet
    ],
})
export class ReceptionLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(public receptionLinesSrv: ReceptionLinesService) {
        super(receptionLinesSrv,  DOC_RECEPTION);
    }

    readForm(): TransactionLine {
        const value =  super.readForm();
        value.qtyInvoiced = value.qtySatisfied;
        return value;
    }
}
