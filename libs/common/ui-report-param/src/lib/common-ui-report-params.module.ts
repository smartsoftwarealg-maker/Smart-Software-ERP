import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportParamsListComponent} from './report-params-list.component';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {ReportParamsDetailComponent} from './report-params-detail.component';
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {RouterModule} from "@angular/router";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiAutoCompleteModule
    ],
    exports: [ReportParamsListComponent, ReportParamsDetailComponent],
    declarations: [ReportParamsListComponent, ReportParamsDetailComponent]
})
export class CommonUiReportParamsModule {
}
