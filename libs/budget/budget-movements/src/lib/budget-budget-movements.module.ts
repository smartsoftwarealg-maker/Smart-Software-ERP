import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetCommitmentListComponent } from './budget-commitment-list/budget-commitment-list.component';
import { BudgetCommitmentDetailComponent } from './budget-commitment-detail/budget-commitment-detail.component';
import { BudgetTransferListComponent } from './budget-transfer-list/budget-transfer-list.component';
import { BudgetTransferDetailComponent } from './budget-transfer-detail/budget-transfer-detail.component';
import { MaterialModule } from '@ss/common/api-common';


import { ReactiveFormsModule } from '@angular/forms';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import {RouterOutlet} from '@angular/router';
import {BudgetTransferLineListComponent} from './budget-transfer-line-list/budget-transfer-line-list.component';
import {BudgetTransferLineDetailComponent} from './budget-transfer-line-detail/budget-transfer-line-detail.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,
        CommonUiAutoCompleteModule,

        CommonUiDatepickerModule,
        RouterOutlet,
        BudgetCommitmentListComponent,
        BudgetCommitmentDetailComponent,
        BudgetTransferListComponent,
        BudgetTransferDetailComponent,
        BudgetTransferLineListComponent,
        BudgetTransferLineDetailComponent,
    ],
})
export class BudgetBudgetMovementsModule {}
