import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaListComponent } from './formula-list.component';
import { FormulaDetailComponent } from './formula-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        UiPaginationModule,
        CommonUiLangModule,
        CommonUiAutoCompleteModule
    ],
    declarations: [
      FormulaListComponent,
      FormulaDetailComponent
    ],
})
export class RemunerationPayrollFormulasModule {}
