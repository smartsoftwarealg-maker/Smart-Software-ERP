import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthCloserComponent } from './closer/month-closer.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import { MonthCancelerComponent } from './month-canceler/month-canceler.component';
import { MonthSelectorComponent } from './month-selector/month-selector.component';

import { ArchiveGeneratorComponent } from './archive-generator/archive-generator.component';

@NgModule({
    imports: [
    CommonModule,
    MaterialModule,


    ReactiveFormsModule,

    CommonUiDatepickerModule,
    CommonUiAutoCompleteModule,
    MonthCloserComponent,
    MonthCancelerComponent,
    MonthSelectorComponent,
    ArchiveGeneratorComponent
],
})
export class RemunerationPayrollMonthModule {}
