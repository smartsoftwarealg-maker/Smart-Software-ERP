import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryExitListComponent} from "./inventory-exit-list/inventory-exit-list.component";
import {InventoryExitDetailComponent} from "./inventory-exit-detail/inventory-exit-detail.component";
import {MaterialModule} from "@ss/common/api-common";


import {ReactiveFormsModule} from "@angular/forms";

import {RouterModule} from "@angular/router";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {StockUiInventoryExitLinesModule} from "@ss/stock/ui-inventory-exit-lines";
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        DocInfoComponent,
        StockUiInventoryExitLinesModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        InventoryExitListComponent,
        InventoryExitDetailComponent
    ],
    exports: [
        InventoryExitListComponent,
        InventoryExitDetailComponent
    ]
})
export class StockUiInventoryExitModule {
}
