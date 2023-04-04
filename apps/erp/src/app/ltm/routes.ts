import { Routes } from '@angular/router';

import {
    ABS_INDEX_URL, CanDeactivateService, LIST_URL,
} from '@ss/common/api-common';
import {
    LTM_LINES_URL,
    LTM_MATTER_URL,
    LTM_PERIODICITY_URL,
    LTM_CHARTS_URL,
    LTM_TEST_URL,
    LTM_TESTING_URL, LTM_BATCH_URL, DASHBOARD_URL
} from '../common';

import {
    LineMatterDetailComponent,
    LtmLineDetailComponent,
    LtmLineListComponent,
    LtmMatterDetailComponent,
    LtmMatterListComponent,
    LtmMatterTestListComponent,
    LtmPeriodicitiesDetailComponent,
    LtmPeriodicitiesListComponent,
    LtmTestDetailComponent,
    LtmTestListComponent,
    LtmMatterTestDetailComponent,
    LtmTestingListComponent,
    LtmTestingDetailComponent,
    LtmReportComponent,
    LineMatterListComponent,
    LtmBatchInputComponent
} from '@ss/ltm/ltm';
import {loginGuard} from '../erp-guards';
import {DashboardComponent} from '@ss/dashboard';

export const ltmRoutes: Routes = [
    {
        path: LTM_BATCH_URL, component: LtmBatchInputComponent, canActivate: [loginGuard]
    },
    {
        path: LTM_CHARTS_URL, component: LtmReportComponent, canActivate: [loginGuard]
    },
    {
        path: LTM_LINES_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmLineListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmLineDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', component: LineMatterListComponent, pathMatch: 'full'},
                    { path: 'detail',
                      children: [
                          { path: ':id', component: LineMatterDetailComponent }
                      ]
                    }
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LTM_MATTER_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmMatterListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmMatterDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', component: LtmMatterTestListComponent, pathMatch: 'full'},
                    { path: 'detail',
                        children: [
                            { path: ':id', component: LtmMatterTestDetailComponent }
                        ]
                    }
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LTM_TEST_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmTestListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmTestDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LTM_PERIODICITY_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmPeriodicitiesListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmPeriodicitiesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LTM_TESTING_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmTestingListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmTestingDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [loginGuard],
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];
