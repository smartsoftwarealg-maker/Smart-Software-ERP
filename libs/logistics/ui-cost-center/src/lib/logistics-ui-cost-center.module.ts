import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CostCenterListComponent} from "./cost-center-list.component";
import {CostCenterDetailComponent} from "./cost-center-detail.component";
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
        CostCenterListComponent,
        CostCenterDetailComponent
    ],
    exports: [
        CostCenterListComponent,
        CostCenterDetailComponent
    ]
})
export class LogisticsUiCostCenterModule {
}
