import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgentPriceListComponent} from "./agent-price-list.component";
import {AgentPriceDetailComponent} from "./agent-price-detail.component";
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule
    ],
    declarations: [
        AgentPriceListComponent,
        AgentPriceDetailComponent
    ],
    exports: [
        AgentPriceListComponent,
        AgentPriceDetailComponent
    ]
})
export class LogisticsUiPriceModule {
}
