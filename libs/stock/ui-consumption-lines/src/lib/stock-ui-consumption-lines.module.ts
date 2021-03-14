import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsumptionLinesListComponent} from "./consumption-lines-list.component";
import {ConsumptionLinesDetailComponent} from "./consumption-lines-detail.component";
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {RouterModule} from "@angular/router";
import {LogisticsUiDocInfoModule} from "@ss/logistics/ui-doc-info";
import {LogisticsUiStockInfoModule} from "@ss/logistics/ui-stock-info";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        RouterModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        LogisticsUiDocInfoModule,
        CommonUiAutoCompleteModule,
        LogisticsUiStockInfoModule,
    ],
    declarations: [
        ConsumptionLinesListComponent,
        ConsumptionLinesDetailComponent,
    ],
    exports: [
        ConsumptionLinesListComponent,
        ConsumptionLinesDetailComponent
    ]
})
export class StockUiConsumptionLinesModule {
}
