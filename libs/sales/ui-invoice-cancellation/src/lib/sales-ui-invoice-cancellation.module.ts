import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {RouterModule} from "@angular/router";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {LogisticsUiDocInfoModule} from "@ss/logistics/ui-doc-info";
import {LogisticsUiDocImportModule} from "@ss/logistics/ui-doc-import";
import {
    InvoiceDetailComponent,
    InvoiceLinesDetailComponent,
    InvoiceLinesListComponent,
    InvoiceListComponent
} from "@ss/sales/ui-invoice";
import {InvoiceCancellationListComponent} from "./invoice-cancellation-list.component";
import {InvoiceCancellationDetailComponent} from "./invoice-cancellation-detail.component";
import {InvoiceCancellationLinesDetailComponent} from "./invoice-cancellation-lines-detail.component";
import {InvoiceCancellationLinesListComponent} from "./invoice-cancellation-lines-list.component";

@NgModule({
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
    declarations: [
        InvoiceCancellationListComponent,
        InvoiceCancellationDetailComponent,
        InvoiceCancellationLinesDetailComponent,
        InvoiceCancellationLinesListComponent
    ]
})
export class SalesUiInvoiceCancellationModule {}
