import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { RouterModule } from '@angular/router';
import { StockUiConsumptionLinesModule } from '@ss/stock/ui-consumption-lines';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { LogisticsUiStockInfoModule } from '@ss/logistics/ui-stock-info';
import { BankExpenseListComponent } from './bank-expense-list/bank-expense-list.component';
import { BankExpenseDetailComponent } from './bank-expense-detail/bank-expense-detail.component';
import { TransactionLineListComponent } from './transaction-line-list/transaction-line-list.component';
import { TransactionLineDetailComponent } from './transaction-line-detail/transaction-line-detail.component';
import { AppArchiveModule } from "@ss/common/app-archive";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CommonUiLangModule,
    UiPaginationModule,
    ReactiveFormsModule,
    CommonUiConfirmationDialogModule,
    RouterModule,
    StockUiConsumptionLinesModule,
    LogisticsUiDocInfoModule,
    CommonUiDatepickerModule,
    CommonUiAutoCompleteModule,
    LogisticsUiStockInfoModule,
    AppArchiveModule
  ],
    declarations: [
        TransactionListComponent,
        TransactionDetailComponent,
        BankExpenseListComponent,
        BankExpenseDetailComponent,
        TransactionLineListComponent,
        TransactionLineDetailComponent,
    ],
})
export class TreasuryUiTransactionsModule {}
