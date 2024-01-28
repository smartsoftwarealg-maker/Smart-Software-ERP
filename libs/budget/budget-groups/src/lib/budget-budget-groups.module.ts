import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetGroupsComponent } from './budget-groups/budget-groups.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { BudgetGroupsAddDlgComponent } from './budget-groups-add-dlg/budget-groups-add-dlg.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,

        CommonUiAutoCompleteModule,
        CommonUiConfirmationDialogModule,
    ],
    declarations: [BudgetGroupsComponent, BudgetGroupsAddDlgComponent],
})
export class BudgetBudgetGroupsModule {}
