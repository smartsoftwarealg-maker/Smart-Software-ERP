import {
    DASHBOARD_QUERY_URL,
    DASHBOARD_URL
} from '../common';
import { Routes } from '@angular/router';
import { ABS_INDEX_URL, CanActivateService, LIST_URL} from '@ss/common/api-common';
import {DashboardListComponent, DashboardDetailComponent, DashboardComponent} from '@ss/dashboard';
import {loginGuard} from '../erp-guards';

export const dashboardRoutes: Routes = [
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [loginGuard],
    },
    {
        path: DASHBOARD_QUERY_URL,
        children: [
            {
                path: LIST_URL,
                component: DashboardListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: DashboardDetailComponent,
                canActivate: [loginGuard],
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];

