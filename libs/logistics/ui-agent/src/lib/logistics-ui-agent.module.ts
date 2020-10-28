import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgentListComponent} from "./agent-list.component";
import {AgentDetailComponent} from "./agent-detail.component";
import {MaterialModule} from "@ss/common/api-common";
import {UiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, MaterialModule, UiLangModule, UiPaginationModule, ReactiveFormsModule],
    declarations: [AgentListComponent, AgentDetailComponent],
    exports: [AgentListComponent, AgentDetailComponent]
})
export class LogisticsUiAgentModule {
}
