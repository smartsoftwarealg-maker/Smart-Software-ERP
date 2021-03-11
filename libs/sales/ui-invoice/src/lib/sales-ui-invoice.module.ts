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
import {SalesUiDeliveryLinesModule} from "@ss/sales/ui-delivery-lines";
import {LogisticsUiDocImportModule} from "@ss/logistics/ui-doc-import";
import {InvoiceListComponent} from "./invoice-list.component";
import {InvoiceDetailComponent} from "./invoice-detail.component";
import {InvoiceLinesDetailComponent} from "./invoice-lines-detail.component";
import {InvoiceLinesListComponent} from "./invoice-lines-list.component";

@NgModule({
  imports: [CommonModule,
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
     InvoiceListComponent,
     InvoiceDetailComponent,
     InvoiceLinesDetailComponent,
     InvoiceLinesListComponent
 ]
})
export class SalesUiInvoiceModule {}
