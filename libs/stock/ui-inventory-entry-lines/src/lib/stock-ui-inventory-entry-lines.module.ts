import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryEntryLinesListComponent} from "./inventory-entry-lines-list/inventory-entry-lines-list.component";
import {InventoryEntryLinesDetailComponent} from "./inventory-entry-lines-detail/inventory-entry-lines-detail.component";
import {MaterialModule} from "@ss/common/api-common";


import {ReactiveFormsModule} from "@angular/forms";

import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {RouterModule} from "@angular/router";

import {UiStockInfoComponent} from "@ss/logistics/ui-stock-info";
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        RouterModule,
        ReactiveFormsModule,

        UiStockInfoComponent,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        DocInfoComponent,
        InventoryEntryLinesListComponent,
        InventoryEntryLinesDetailComponent
    ],
    exports: [
        InventoryEntryLinesListComponent,
        InventoryEntryLinesDetailComponent
    ]
})
export class StockUiInventoryEntryLinesModule {
}
