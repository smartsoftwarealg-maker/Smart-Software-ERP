import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowDialogComponent } from './workflow-dialog/workflow-dialog.component';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { RemunerationPaymonthEditorModule } from '@ss/remuneration/paymonth-editor';
import { CommonPayrollModule } from '@ss/payroll-common';
import { DocStatusListComponent } from './doc-status-list/doc-status-list.component';
import { DocStatusDetailComponent } from './doc-status-detail/doc-status-detail.component';
import { UserMessageDetailComponent } from './user-message-detail/user-message-detail.component';
import { UserMessageListComponent } from './user-message-list/user-message-list.component';
import { UserDocumentListComponent } from './user-document-list/user-document-list.component';
import { UserDocumentDetailComponent } from './user-document-detail/user-document-detail.component';
import { WorkflowInboxListComponent } from './workflow-inbox-list/workflow-inbox-list.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        UiPaginationModule,
        CommonUiLangModule,
        CommonUiAutoCompleteModule,
        RemunerationPaymonthEditorModule,
        CommonPayrollModule,
    ],
    declarations: [
        WorkflowDialogComponent,
        DocStatusListComponent,
        DocStatusDetailComponent,
        UserMessageDetailComponent,
        UserMessageListComponent,
        UserDocumentListComponent,
        UserDocumentDetailComponent,
        WorkflowInboxListComponent,
    ],
})
export class WorkflowModule {}
