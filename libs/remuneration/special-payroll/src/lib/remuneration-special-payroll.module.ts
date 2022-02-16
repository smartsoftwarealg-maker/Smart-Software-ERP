import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialPayrollListComponent } from './special-payroll-list/special-payroll-list.component';
import { SpecialPayrollDetailComponent } from './special-payroll-detail/special-payroll-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
    declarations: [
      SpecialPayrollListComponent,
      SpecialPayrollDetailComponent
    ],
})
export class RemunerationSpecialPayrollModule {}
