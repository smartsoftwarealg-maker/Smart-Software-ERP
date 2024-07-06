import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProformaListComponent } from './proforma-list/proforma-list.component';
import { ProformaDetailComponent } from './proforma-detail/proforma-detail.component';
import { ProformaLinesDetailComponent } from './proforma-lines-detail/proforma-lines-detail.component';
import { ProformaLinesListComponent } from './proforma-lines-list/proforma-lines-list.component';
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
      ProformaListComponent,
      ProformaDetailComponent,
      ProformaLinesDetailComponent,
      ProformaLinesListComponent
    ],

    exports: [
      ProformaListComponent,
      ProformaDetailComponent,
      ProformaLinesDetailComponent,
      ProformaLinesListComponent
    ],
})
export class SalesUiProformaModule {}
