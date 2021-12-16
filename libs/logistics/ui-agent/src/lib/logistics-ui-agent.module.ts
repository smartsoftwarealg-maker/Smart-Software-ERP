import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgentListComponent} from './agent-list.component';
import {AgentDetailComponent} from './agent-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {MiniAgentDetailComponent} from './ui-mini-agent/mini-agent-detail.component';
import {CustomerProfileComponent} from './ui-customer-profile/customer-profile.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule
    ],
    declarations: [
        AgentListComponent,
        AgentDetailComponent,
        MiniAgentDetailComponent,
        CustomerProfileComponent,
    ],
    exports: [
        AgentListComponent,
        AgentDetailComponent,
        MiniAgentDetailComponent,
        CustomerProfileComponent,
    ]
})
export class LogisticsUiAgentModule {
}
