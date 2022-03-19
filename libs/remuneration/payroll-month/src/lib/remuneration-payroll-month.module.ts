import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthCloserComponent } from './closer/month-closer.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import { MonthCancelerComponent } from './month-canceler/month-canceler.component';
import { MonthSelectorComponent } from './month-selector/month-selector.component';
import {RemunerationSpecialPayrollCommonModule} from '@ss/remuneration/special-payroll-common';
import { ArchiveGeneratorComponent } from './archive-generator/archive-generator.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        RemunerationSpecialPayrollCommonModule
    ],
    declarations: [
      MonthCloserComponent,
      MonthCancelerComponent,
      MonthSelectorComponent,
      ArchiveGeneratorComponent
    ],
})
export class RemunerationPayrollMonthModule {}
