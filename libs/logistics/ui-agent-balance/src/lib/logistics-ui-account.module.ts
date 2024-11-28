import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";


import {ReactiveFormsModule} from "@angular/forms";

import {AgentBalanceComponent} from "./agent-balance.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        AgentBalanceComponent
    ],
    exports: [AgentBalanceComponent]
})
export class LogisticsUiAccountModule {
}
