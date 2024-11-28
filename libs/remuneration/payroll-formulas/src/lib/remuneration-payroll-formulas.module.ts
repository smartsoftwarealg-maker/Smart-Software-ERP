import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaListComponent } from './formula-list.component';
import { FormulaDetailComponent } from './formula-detail.component';
import {MaterialModule} from '@ss/common/api-common';


import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        CommonUiAutoCompleteModule,
        FormulaListComponent,
        FormulaDetailComponent
    ],
})
export class RemunerationPayrollFormulasModule {}
