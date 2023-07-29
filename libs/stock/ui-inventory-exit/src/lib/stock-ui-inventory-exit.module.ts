import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryExitListComponent} from "./inventory-exit-list/inventory-exit-list.component";
import {InventoryExitDetailComponent} from "./inventory-exit-detail/inventory-exit-detail.component";
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {RouterModule} from "@angular/router";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {StockUiInventoryExitLinesModule} from "@ss/stock/ui-inventory-exit-lines";
import {LogisticsUiDocInfoModule} from "@ss/logistics/ui-doc-info";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        LogisticsUiDocInfoModule,
        StockUiInventoryExitLinesModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
    declarations: [
        InventoryExitListComponent,
        InventoryExitDetailComponent,
    ],
    exports: [
        InventoryExitListComponent,
        InventoryExitDetailComponent
    ]
})
export class StockUiInventoryExitModule {
}
