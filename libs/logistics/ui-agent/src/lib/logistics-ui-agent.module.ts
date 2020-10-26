import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgentListComponent} from "./agent-list.component";
import {AgentDetailComponent} from "./agent-detail.component";

@NgModule({
    imports: [CommonModule],
    declarations: [AgentListComponent, AgentDetailComponent],
    exports: [AgentListComponent, AgentDetailComponent]
})
export class LogisticsUiAgentModule {
}
