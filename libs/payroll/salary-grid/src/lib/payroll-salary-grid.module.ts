import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryGridListComponent } from './salary-grid-list/salary-grid-list.component';
import { SalaryGridDetailComponent } from './salary-grid-detail/salary-grid-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {RemunerationPaymonthEditorModule} from '@ss/remuneration/paymonth-editor';
import {CommonPayrollModule} from '@ss/payroll-common';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        UiPaginationModule,
        CommonUiLangModule,
        CommonUiAutoCompleteModule,
        RemunerationPaymonthEditorModule,
        CommonPayrollModule
    ],
    declarations: [
      SalaryGridListComponent,
      SalaryGridDetailComponent
    ],
})
export class PayrollSalaryGridModule {}
