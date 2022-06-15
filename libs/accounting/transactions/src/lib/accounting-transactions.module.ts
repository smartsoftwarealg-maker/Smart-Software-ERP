import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionLinesListComponent } from './transaction-lines-list/transaction-lines-list.component';
import { TransactionLinesDetailComponent } from './transaction-lines-detail/transaction-lines-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiMainPageModule} from '@ss/common/ui-main-page';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {RouterModule} from '@angular/router';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { PeriodSelectorComponent } from './period-selector/period-selector.component';
import { AccFileListComponent } from './acc-file-list/acc-file-list.component';
import { AccFileDetailComponent } from './acc-file-detail/acc-file-detail.component';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import { DepreciationGenerationComponent } from './depreciation-generation/depreciation-generation.component';
import { AccProjectListComponent } from './acc-project-list/acc-project-list.component';
import { AccProjectDetailComponent } from './acc-project-detail/acc-project-detail.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiMainPageModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        CommonUiConfirmationDialogModule
    ],
    declarations: [
      TransactionListComponent,
      TransactionDetailComponent,
      TransactionLinesListComponent,
      TransactionLinesDetailComponent,
      FileSelectorComponent,
      PeriodSelectorComponent,
      AccFileListComponent,
      AccFileDetailComponent,
      DepreciationGenerationComponent,
      AccProjectListComponent,
      AccProjectDetailComponent
    ],
})
export class AccountingTransactionsModule {}
