import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialPayrollListComponent } from './special-payroll-list/special-payroll-list.component';
import { SpecialPayrollDetailComponent } from './special-payroll-detail/special-payroll-detail.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import { ImageInputComponent } from '@ss/common/ui-image-input';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        ImageInputComponent,
        SpecialPayrollListComponent,
        SpecialPayrollDetailComponent
    ],
})
export class RemunerationSpecialPayrollModule {}
