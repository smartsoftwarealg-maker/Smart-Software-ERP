import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {DepositListComponent} from './deposit-list.component';
import {DepositDetailComponent} from './deposit-detail.component';
import {ExchangeUiInfoModule} from '@ss/exchange/ui-info';
import {CashCommissionListComponent} from './cash-commision/cash-commission-list.component';
import {CashCommissionDetailComponent} from './cash-commision/cash-commission-detail.component';
import {CurrencyTransferListComponent} from "./currency-transfer/currency-transfer-list.component";
import {CurrencyTransferDetailComponent} from "./currency-transfer/currency-transfer-detail.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        ExchangeUiInfoModule,
        DepositListComponent,
        DepositDetailComponent,
        CashCommissionListComponent,
        CashCommissionDetailComponent,
        CurrencyTransferListComponent,
        CurrencyTransferDetailComponent
    ],
    exports: [
        DepositListComponent,
        DepositDetailComponent,
        CashCommissionListComponent,
        CashCommissionDetailComponent,
        CurrencyTransferListComponent,
        CurrencyTransferDetailComponent
    ]
})
export class ExchangeUiCurrencyDepositModule {}
