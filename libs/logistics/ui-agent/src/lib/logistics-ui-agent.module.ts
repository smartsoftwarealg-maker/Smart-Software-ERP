import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentListComponent } from './agent-list/agent-list.component';
import { AgentDetailComponent } from './agent-detail/agent-detail.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { MiniAgentDetailComponent } from './ui-mini-agent/mini-agent-detail.component';
import { CustomerProfileComponent } from './ui-customer-profile/customer-profile.component';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { AppArchiveModule } from '@ss/common/app-archive';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AgentImportComponent } from './agent-import/agent-import.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        LogisticsUiDocInfoModule,
        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CustomAttributesModule,
    ],
    declarations: [
        AgentListComponent,
        AgentDetailComponent,
        MiniAgentDetailComponent,
        CustomerProfileComponent,
        AgentImportComponent,
    ],
    exports: [
        AgentListComponent,
        AgentDetailComponent,
        MiniAgentDetailComponent,
        CustomerProfileComponent,
    ],
})
export class LogisticsUiAgentModule {}
