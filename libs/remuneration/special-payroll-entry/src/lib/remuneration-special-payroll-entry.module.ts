import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialPayrollEntryDetailComponent } from './special-payroll-entry-detail/special-payroll-entry-detail.component';
import { SpecialPayrollInputdListComponent } from './special-payroll-entry-list/special-payroll-entry-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      SpecialPayrollEntryDetailComponent,
      SpecialPayrollInputdListComponent
    ],
})
export class RemunerationSpecialPayrollEntryModule {}
