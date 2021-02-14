import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsumptionListComponent} from "./consumption-list.component";
import {ConsumptionDetailComponent} from "./consumption-detail.component";
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {RouterModule} from "@angular/router";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {StockApiConsumptionLinesModule} from "../../../api-consumption-lines/src/lib/stock-api-consumption-lines.module";
import {StockUiConsumptionLinesModule} from "@ss/stock/ui-consumption-lines";
import {LogisticsUiDocInfoModule} from "@ss/logistics/ui-doc-info";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        StockUiConsumptionLinesModule,
        LogisticsUiDocInfoModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
    declarations: [
        ConsumptionListComponent,
        ConsumptionDetailComponent,
    ],
    exports: [
        ConsumptionListComponent,
        ConsumptionDetailComponent
    ]
})
export class StockUiConsumptionModule {
}
