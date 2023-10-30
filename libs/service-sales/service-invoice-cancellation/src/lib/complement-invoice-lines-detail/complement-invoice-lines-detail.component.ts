import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_INVOICE_CANCELLATION, TransactionLine,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { RouterModule } from '@angular/router';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { LogisticsUiDocImportModule } from '@ss/logistics/ui-doc-import';
import { ServiceArticleService } from '@ss/service-sales/service-articles';

@Component({
    selector: 'ss-invoice-lines-detail',
    templateUrl: './complement-invoice-lines-detail.component.html',
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
        LogisticsUiDocInfoModule,
        LogisticsUiDocImportModule
    ],
})
export class ComplementInvoiceLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    private serviceSrv = inject(ServiceArticleService);

    serviceLookup = new DefaultAutoCompleteModel(this.serviceSrv, 'reference', 'description2');
    constructor(public inventoryLinesService: TransactionLinesService) {
        super(inventoryLinesService, DOC_INVOICE_CANCELLATION);
    }

    override setupForm(b: TransactionLine): UntypedFormGroup {
        b.price = Math.abs(b.price);
        return super.setupForm(b);
    }

    override readForm(): TransactionLine {
        const value = super.readForm();
        value.price = value.price > 0? -value.price : value.price;
        return value;
    }
}
