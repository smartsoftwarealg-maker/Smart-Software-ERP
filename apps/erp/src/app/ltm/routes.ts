import { Routes } from '@angular/router';

import {
    ABS_INDEX_URL, CanDeactivateService, LIST_URL,
} from '@ss/common/api-common';
import {
    LTM_MATTER_URL,
    LTM_PERIODICITY_URL,
    LTM_CHARTS_URL,
    LTM_TEST_URL,
    LTM_TESTING_URL,
    LTM_BATCH_URL,
    DASHBOARD_URL,
    COMMON_REPORTS_URL,
    LTM_LINES_URL,
    LTM_UNIT_URL,
    LTM_TEST_TYPE_URL,
    LTM_MIXTURE_URL,
    LTM_ANOMALIES_URL_URL,
    LTM_TESTING_ANOMALIES_URL
} from '../common';

import {
    LtmMatterDetailComponent,
    LtmMatterListComponent,
    LtmMatterTestListComponent,
    LtmPeriodicitiesDetailComponent,
    LtmPeriodicitiesListComponent,
    LtmMatterTestDetailComponent,
    LtmTestingListComponent,
    LtmTestingDetailComponent,
    LtmReportComponent,
    LtmBatchInputComponent,
    LineMatterDetailComponent,
    LineMatterListComponent,
    LtmTestListComponent,
    LtmTestTypeListComponent,
    LtmTestTypeDetailComponent,
    LtmTestDetailComponent,
    LTMMixtureListComponent,
    LtmMixtureDetailComponent,
    LtmMixtureDetailListComponent,
    LtmMixtureDetailDetailComponent,
    LtmAnomalyListComponent,
    LtmAnomalyDetailComponent,
    LtmTestingAnomalyListComponent,
    LtmTestingAnomalyDetailComponent
} from '@ss/ltm/ltm';
import {loginGuard} from '../erp-guards';
import {DashboardComponent} from '@ss/dashboard';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import { UnitDetailComponent, UnitListComponent } from '@ss/common/ui-lookup';

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
            { path: LIST_URL, component: LineMatterListComponent, canActivate: [loginGuard]},
            { path: ':id', component: LineMatterDetailComponent, canActivate: [loginGuard] }
        ]
    },
    {
        path: LTM_ANOMALIES_URL_URL,
        children: [
            { path: LIST_URL, component: LtmAnomalyListComponent, canActivate: [loginGuard]},
            { path: ':id', component: LtmAnomalyDetailComponent, canActivate: [loginGuard] }
        ]
    },
    {
        path: LTM_TESTING_ANOMALIES_URL,
        children: [
            { path: LIST_URL, component: LtmTestingAnomalyListComponent, canActivate: [loginGuard]},
            { path: ':id', component: LtmTestingAnomalyDetailComponent, canActivate: [loginGuard] }
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
        ]
    },
    {
        path: LTM_MIXTURE_URL,
        children: [
            {
                path: LIST_URL,
                component: LTMMixtureListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmMixtureDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    {   path: '',
                        redirectTo: 'detail',
                        pathMatch: 'full',
                    },
                    { path: 'detail',
                        children: [
                            { path: '', component: LtmMixtureDetailListComponent, pathMatch: 'full'},
                            { path: ':id', component: LtmMixtureDetailDetailComponent }
                        ]
                    }
                ]
            },
        ]
    },
    {
        path: LTM_UNIT_URL,
        children: [
            {
                path: LIST_URL,
                component: UnitListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: UnitDetailComponent,
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
        path: LTM_TEST_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: LtmTestTypeListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: LtmTestTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
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
        path: COMMON_REPORTS_URL,
        component: ReportViewComponent,
        canActivate: [loginGuard],
        data: { reportBase: 'ltm' }
    },
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [loginGuard],
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];
