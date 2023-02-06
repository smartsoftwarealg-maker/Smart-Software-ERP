import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetPlanningComponent } from './budget-planning/budget-planning.component';
import { BudgetPlanningAddDlgComponent } from './budget-planning-add-dlg/budget-planning-add-dlg.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiMainPageModule} from '@ss/common/ui-main-page';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiMainPageModule,
        CommonUiAutoCompleteModule,
        CommonUiConfirmationDialogModule,
    ],
    declarations: [BudgetPlanningComponent, BudgetPlanningAddDlgComponent],
})
export class BudgetBudgetPlanningModule {}
