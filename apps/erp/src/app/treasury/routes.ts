import { Routes } from '@angular/router';
import { TREASURY_AGENT_URL } from '../common';
import { LIST_URL, CanActivateService, CanDeactivateService, ABS_INDEX_URL } from '@ss/common/api-common';
import { AgentDetailComponent, AgentListComponent } from '@ss/logistics/ui-agent';


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
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    }
];
