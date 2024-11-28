import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetGroupsComponent } from './budget-groups/budget-groups.component';
import { MaterialModule } from '@ss/common/api-common';


import { ReactiveFormsModule } from '@angular/forms';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

import { BudgetGroupsAddDlgComponent } from './budget-groups-add-dlg/budget-groups-add-dlg.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,
        CommonUiAutoCompleteModule,

        BudgetGroupsComponent, BudgetGroupsAddDlgComponent,
    ],
})
export class BudgetBudgetGroupsModule {}
