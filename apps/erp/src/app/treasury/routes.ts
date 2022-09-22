import { Routes } from '@angular/router';
import { TREASURY_AGENT_URL, TREASURY_CHECKS_URL, TREASURY_CHECK_BOOKS_URL, TREASURY_JOURNALS_URL } from '../common';
import { LIST_URL, CanActivateService, CanDeactivateService, ABS_INDEX_URL } from '@ss/common/api-common';
import { AgentDetailComponent, AgentListComponent } from '@ss/logistics/ui-agent';
import { CheckListComponent, CheckDetailComponent } from '@ss/treasury/ui-checks';
import { CheckBookListComponent, CheckBookDetailComponent } from '@ss/treasury/ui-check-books';
import { JournalListComponent, JournalDetailComponent } from '@ss/treasury/ui-journal';

export const mainRoutes: Routes = [
    {
        path: TREASURY_AGENT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [CanActivateService],
                data: { form: 'Agent' }
            },
            {
                path: ':id',
                component: AgentDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: TREASURY_CHECKS_URL,
        children: [
            {
                path: LIST_URL,
                component: CheckListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CheckDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: TREASURY_CHECK_BOOKS_URL,
        children: [
            {
                path: LIST_URL,
                component: CheckBookListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CheckBookDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: TREASURY_JOURNALS_URL,
        children: [
            {
                path: LIST_URL,
                component: JournalListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: JournalDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    }
];
