import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";


import {ReactiveFormsModule} from "@angular/forms";

import {AgentDebtsComponent} from "./agent-debts.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        AgentDebtsComponent
    ],
    exports: [AgentDebtsComponent]
})
export class LogisticsUiAgentDebtsModule {
}
