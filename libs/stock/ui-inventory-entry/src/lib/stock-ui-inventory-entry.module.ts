import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryEntryListComponent} from './inventory-entry-list.component';
import {InventoryEntryDetailComponent} from './inventory-entry-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {RouterModule} from '@angular/router';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {StockUiInventoryEntryLinesModule} from '@ss/stock/ui-inventory-entry-lines';
import {LogisticsUiDocInfoModule} from '@ss/logistics/ui-doc-info';
import {LogisticsUiStockInfoModule} from '@ss/logistics/ui-stock-info';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        StockUiInventoryEntryLinesModule,
        LogisticsUiDocInfoModule,
        LogisticsUiStockInfoModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
    declarations: [
        InventoryEntryListComponent,
        InventoryEntryDetailComponent,
    ],
    exports: [
        InventoryEntryListComponent,
        InventoryEntryDetailComponent
    ]
})
export class StockUiInventoryEntryModule {
}
