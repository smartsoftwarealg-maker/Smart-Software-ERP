import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetCommitmentListComponent } from './budget-commitment-list/budget-commitment-list.component';
import { BudgetCommitmentDetailComponent } from './budget-commitment-detail/budget-commitment-detail.component';
import { BudgetTransferListComponent } from './budget-transfer-list/budget-transfer-list.component';
import { BudgetTransferDetailComponent } from './budget-transfer-detail/budget-transfer-detail.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import {RouterOutlet} from '@angular/router';
import {BudgetTransferLineListComponent} from './budget-transfer-line-list/budget-transfer-line-list.component';
import {BudgetTransferLineDetailComponent} from './budget-transfer-line-detail/budget-transfer-line-detail.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,

        CommonUiAutoCompleteModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        RouterOutlet,
    ],
    declarations: [
        BudgetCommitmentListComponent,
        BudgetCommitmentDetailComponent,
        BudgetTransferListComponent,
        BudgetTransferDetailComponent,
        BudgetTransferLineListComponent,
        BudgetTransferLineDetailComponent,
    ],
})
export class BudgetBudgetMovementsModule {}
