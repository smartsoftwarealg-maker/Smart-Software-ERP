import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {LogisticsUiDocInfoModule} from '@ss/logistics/ui-doc-info';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {ReceptionLinesListComponent} from './reception-lines-list.component';
import {ReceptionLinesDetailComponent} from './reception-lines-detail.component';
import {ReceptionListComponent} from './reception-list.component';
import {ReceptionDetailComponent} from './reception-detail.component';
import {LogisticsUiStockInfoModule} from '@ss/logistics/ui-stock-info';
import { RouterOutlet } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CommonUiLangModule,
    UiPaginationModule,
    ReactiveFormsModule,
    CommonUiConfirmationDialogModule,
    CommonUiDatepickerModule,
    CommonUiAutoCompleteModule,
    LogisticsUiDocInfoModule,
    LogisticsUiStockInfoModule,
    RouterOutlet
  ],
    declarations: [
        ReceptionListComponent,
        ReceptionDetailComponent,
        ReceptionLinesListComponent,
        ReceptionLinesDetailComponent,
    ],
    exports: [
        ReceptionListComponent,
        ReceptionDetailComponent,
        ReceptionLinesListComponent,
        ReceptionLinesDetailComponent,
    ]
})
export class PurchasesUiReceptionModule {}
