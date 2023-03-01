import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetCommitmentListComponent } from './budget-commitment-list/budget-commitment-list.component';
import { BudgetCommitmentDetailComponent } from './budget-commitment-detail/budget-commitment-detail.component';
import { BudgetTransferListComponent } from './budget-transfer-list/budget-transfer-list.component';
import { BudgetTransferDetailComponent } from './budget-transfer-detail/budget-transfer-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiMainPageModule} from '@ss/common/ui-main-page';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';

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
        CommonUiDatepickerModule
    ],
    declarations: [
        BudgetCommitmentListComponent,
        BudgetCommitmentDetailComponent,
        BudgetTransferListComponent,
        BudgetTransferDetailComponent,
    ],
})
export class BudgetBudgetMovementsModule {}
