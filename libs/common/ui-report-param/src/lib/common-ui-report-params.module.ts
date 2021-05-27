import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportViewComponent} from './report-view.component';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {RouterModule} from '@angular/router';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {CommonUiDatepickerModule, DatePickerComponent} from '@ss/common/ui-datepicker';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
    exports: [ReportViewComponent],
    declarations: [ReportViewComponent]
})
export class CommonUiReportParamsModule {
}
