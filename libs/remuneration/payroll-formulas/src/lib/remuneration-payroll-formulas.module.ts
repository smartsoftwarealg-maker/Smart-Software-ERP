import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaListComponent } from './formula-list.component';
import { FormulaDetailComponent } from './formula-detail.component';
import {MaterialModule} from '@ss/common/api-common';


import {UiAutoCompleteComponent} from '@ss/common/ui-auto-complete';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,

        FormulaListComponent,
        FormulaDetailComponent
    ],
})
export class RemunerationPayrollFormulasModule {}
