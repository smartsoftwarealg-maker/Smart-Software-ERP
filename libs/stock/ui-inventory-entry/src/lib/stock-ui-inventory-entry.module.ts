import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryEntryListComponent} from './inventory-entry-list/inventory-entry-list.component';
import {InventoryEntryDetailComponent} from './inventory-entry-detail/inventory-entry-detail.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {StockUiInventoryEntryLinesModule} from '@ss/stock/ui-inventory-entry-lines';

import {UiStockInfoComponent} from '@ss/logistics/ui-stock-info';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        StockUiInventoryEntryLinesModule,
        UiStockInfoComponent,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        DocInfoComponent,
        InventoryEntryListComponent,
        InventoryEntryDetailComponent
    ],
    exports: [
        InventoryEntryListComponent,
        InventoryEntryDetailComponent
    ]
})
export class StockUiInventoryEntryModule {
}
