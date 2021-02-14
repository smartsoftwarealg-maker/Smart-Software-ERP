import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReceptionListComponent} from "./reception-list.component";
import {ReceptionDetailComponent} from "./reception-detail.component";
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {RouterModule} from "@angular/router";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {LogisticsUiDocInfoModule} from "@ss/logistics/ui-doc-info";
import {StockUiReceptionLinesModule} from "@ss/stock/ui-reception-lines";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        StockUiReceptionLinesModule,
        LogisticsUiDocInfoModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
    declarations: [
        ReceptionListComponent,
        ReceptionDetailComponent,
    ],
    exports: [
        ReceptionListComponent,
        ReceptionDetailComponent
    ]
})
export class StockUiReceptionModule {
}
