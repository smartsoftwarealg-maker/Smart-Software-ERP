import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoansDetailComponent } from './loans-detail/loans-detail.component';
import { LoansListComponent } from './loans-list/loans-list.component';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {RemunerationPaymonthEditorModule} from '@ss/remuneration/paymonth-editor';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
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
      LoansDetailComponent,
      LoansListComponent
    ],
})
export class RemunerationLoansModule {}
