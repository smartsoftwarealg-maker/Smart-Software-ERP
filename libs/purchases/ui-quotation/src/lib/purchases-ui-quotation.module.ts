import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationDetailComponent } from './quotation-detail/quotation-detail.component';
import { QuotationLinesDetailComponent } from './quotation-lines-detail/quotation-lines-detail.component';
import { QuotationLinesListComponent } from './quotation-lines-list/quotation-lines-list.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {RouterModule} from "@angular/router";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";

import {LogisticsUiStockInfoModule} from "@ss/logistics/ui-stock-info";
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

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

        LogisticsUiStockInfoModule, DocInfoComponent],

    declarations: [
      QuotationDetailComponent,
      QuotationLinesDetailComponent,
      QuotationLinesListComponent,
      QuotationListComponent
    ],

    exports: [
      QuotationDetailComponent,
      QuotationLinesDetailComponent,
      QuotationLinesListComponent,
      QuotationListComponent
    ],
})
export class PurchasesUiQuotationModule {}
