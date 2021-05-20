import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExcDocInfoComponent} from './exc-doc-info.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {LogisticsUiStockInfoModule} from '@ss/logistics/ui-stock-info';
import {BalanceComponent} from './ui-balance/balance.component';
import {HistoryComponent} from './ui-history/history.component';
import {CbalanceComponent} from './ui-cbalance/cbalance.component';
import {CommissionComponent} from './ui-commission/commission.component';
import {GlobalBalanceComponent} from "./ui-global-balance/global-balance.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        RouterModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        LogisticsUiStockInfoModule
    ],
    declarations: [
        ExcDocInfoComponent,
        BalanceComponent,
        CbalanceComponent,
        HistoryComponent,
        CommissionComponent,
        GlobalBalanceComponent
    ],
    exports: [ExcDocInfoComponent]
})
export class ExchangeUiInfoModule {}
