import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoansDetailComponent } from './loans-detail/loans-detail.component';
import { LoansListComponent } from './loans-list/loans-list.component';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {RemunerationPaymonthEditorModule} from '@ss/remuneration/paymonth-editor';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {CommonPayrollModule} from '@ss/payroll-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';

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
