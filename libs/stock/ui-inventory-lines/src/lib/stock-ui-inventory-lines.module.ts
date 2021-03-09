import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryLinesListComponent} from "./inventory-lines-list.component";
import {InventoryLinesDetailComponent} from "./inventory-lines-detail.component";
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {RouterModule} from "@angular/router";
import {LogisticsUiDocInfoModule} from "@ss/logistics/ui-doc-info";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        RouterModule,
        ReactiveFormsModule,
        LogisticsUiDocInfoModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
    ],
    declarations: [
        InventoryLinesListComponent,
        InventoryLinesDetailComponent,
    ],
    exports: [
        InventoryLinesListComponent,
        InventoryLinesDetailComponent
    ]
})
export class StockUiinventoryLinesModule {
}
