import {
    LOGISTICS_AGENT_URL,
    LOGISTICS_OPTION_URL,
    LOGISTICS_PAY_METHOD_URL, LOOKUPS_URL
} from '../common';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {PayMethodDetailComponent, PayMethodListComponent} from '@ss/logistics/ui-pay-method';
import {OptionsDetailComponent} from '@ss/logistics/ui-options';
import {AgentDetailComponent, AgentListComponent} from '@ss/logistics/ui-agent';
import {PaymentsListComponent, PaymentsDetailComponent} from '@ss/logistics/payments';

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./logistics-admin-lookups.module').then(m => m.LogisticsAdminLookupsModule)
    },
    {
        path: LOGISTICS_AGENT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [CanActivateService]
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
    },
    {
        path: LOGISTICS_PAY_METHOD_URL,
        children: [
            {
                path: LIST_URL,
                component: PayMethodListComponent
            },
            {
                path: ':id',
                component: PayMethodDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: LOGISTICS_OPTION_URL,
        component: OptionsDetailComponent,
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivateService]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];

export const lookupRoutes: Routes = [
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
