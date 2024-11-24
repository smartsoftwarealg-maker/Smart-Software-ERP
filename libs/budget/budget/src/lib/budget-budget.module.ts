import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { BudgetSelectorDlgComponent } from './budget-selector-dlg/budget-selector-dlg.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiAutoCompleteModule,
        CommonUiConfirmationDialogModule,
        BudgetListComponent,
        BudgetDetailComponent,
        BudgetSelectorDlgComponent,
    ],
    exports: [BudgetListComponent, BudgetDetailComponent],
})
export class BudgetBudgetModule {}
