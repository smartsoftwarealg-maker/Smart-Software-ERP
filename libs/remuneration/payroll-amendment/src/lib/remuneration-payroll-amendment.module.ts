import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollAmendmentListComponent } from './payroll-amendment-list/payroll-amendment-list.component';
import { PayrollAmendmentDetailComponent } from './payroll-amendment-detail/payroll-amendment-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {RemunerationPaymonthEditorModule} from '@ss/remuneration/paymonth-editor';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        UiPaginationModule,
        CommonUiLangModule,
        CommonUiAutoCompleteModule,
        RemunerationPaymonthEditorModule
    ],
    declarations: [
      PayrollAmendmentListComponent,
      PayrollAmendmentDetailComponent
    ],
})
export class RemunerationPayrollAmendmentModule {}
