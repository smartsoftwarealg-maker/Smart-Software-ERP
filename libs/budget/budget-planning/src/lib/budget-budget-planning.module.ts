import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetPlanningComponent } from './budget-planning/budget-planning.component';
import { BudgetPlanningAddDlgComponent } from './budget-planning-add-dlg/budget-planning-add-dlg.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,
        CommonUiAutoCompleteModule,

        BudgetPlanningComponent, BudgetPlanningAddDlgComponent,
    ],
})
export class BudgetBudgetPlanningModule {}
