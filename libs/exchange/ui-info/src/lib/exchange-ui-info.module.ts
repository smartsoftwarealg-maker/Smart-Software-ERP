import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExcDocInfoComponent} from './exc-doc-info.component';
import {MaterialModule} from '@ss/common/api-common';


import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {BalanceComponent} from './ui-balance/balance.component';
import {HistoryComponent} from './ui-history/history.component';
import {CbalanceComponent} from './ui-cbalance/cbalance.component';
import {CommissionComponent} from './ui-commission/commission.component';
import {GlobalBalanceComponent} from "./ui-global-balance/global-balance.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        RouterModule,
        ReactiveFormsModule,

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
