import { Routes } from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {
    ADMIN_USER_DOCUMENTS_URL,
    ADMIN_USER_MESSAGES_URL,
    ADMIN_WORKFLOW_INBOX_URL,
    LOGISTICS_WORKFLOW_URL
} from '../common';
import {
    DocStatusDetailComponent,
    DocStatusListComponent, UserDocumentDetailComponent, UserDocumentListComponent, UserMessageDetailComponent,
    UserMessageListComponent, WorkflowInboxListComponent
} from '@ss/workflow';
import {loginGuard} from '../erp-guards';

export const workflowRoutes: Routes = [
    {
        path: LOGISTICS_WORKFLOW_URL,
        children: [
            {
                path: LIST_URL,
                component: DocStatusListComponent
            },
            {
                path: ':id',
                component: DocStatusDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMIN_USER_MESSAGES_URL,
        children: [
            {
                path: LIST_URL,
                component: UserMessageListComponent
            },
            {
                path: ':id',
                component: UserMessageDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMIN_USER_DOCUMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: UserDocumentListComponent
            },
            {
                path: ':id',
                component: UserDocumentDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMIN_WORKFLOW_INBOX_URL,
        component: WorkflowInboxListComponent
    },

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}

];
