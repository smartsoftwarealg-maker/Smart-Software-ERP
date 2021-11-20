import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryAnomaliesComponent } from './inventory-anomalies.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {RouterModule} from '@angular/router';
import {StockUiinventoryLinesModule} from '@ss/stock/ui-inventory-lines';
import {LogisticsUiDocInfoModule} from '@ss/logistics/ui-doc-info';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        StockUiinventoryLinesModule,
        LogisticsUiDocInfoModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
    declarations: [
        InventoryAnomaliesComponent
    ],
})
export class StockUiInventoryAnomaliesModule {}
