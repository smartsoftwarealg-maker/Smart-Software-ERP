import { Routes } from '@angular/router';
import {
    ABS_INDEX_URL, CanDeactivateService, LIST_URL
} from '@ss/common/api-common';
import {
    CMMS_FAULT_CAUSE_URL,
    CMMS_FAULTS_URL,
    CMMS_PRIORITY_URL,
    CMMS_ROOT_CAUSE_URL, CMMS_ROUTING_URL,
    CMMS_STATUS_URL,
    CMMS_TYPE_URL
} from '../common';
import { loginGuard } from '../erp-guards';
import {
    CmmsFaultCauseDetailComponent,
    CMMSFaultCauseListComponent,
    CMMSFaultDetailComponent,
    CMMSFaultListComponent,
    CMMSPriorityDetailComponent,
    CMMSPriorityListComponent,
    CMMSRootCauseDetailComponent, CMMSRoutingDetailComponent,
    CMMSRoutingListComponent,
    CMMSTypeDetailComponent,
    CMMSTypeListComponent,
    CMMSRootCauseListComponent
} from '@ss/cmms/lookups';

export const cmmsRoutes: Routes = [
    {
        path: CMMS_FAULTS_URL,
        children: [
            {
                path: LIST_URL,
                component: CMMSFaultListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CMMSFaultDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: CMMS_STATUS_URL,
        children: [
            {
                path: LIST_URL,
                component: CMMSTypeListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CMMSTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },

    {
        path: CMMS_PRIORITY_URL,
        children: [
            {
                path: LIST_URL,
                component: CMMSPriorityListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CMMSPriorityDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },

    {
        path: CMMS_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: CMMSTypeListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CMMSTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },

    {
        path: CMMS_FAULT_CAUSE_URL,
        children: [
            {
                path: LIST_URL,
                component: CMMSFaultCauseListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CmmsFaultCauseDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },

    {
        path: CMMS_ROOT_CAUSE_URL,
        children: [
            {
                path: LIST_URL,
                component: CMMSRootCauseListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CMMSRootCauseDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },

    {
        path: CMMS_ROUTING_URL,
        children: [
            {
                path: LIST_URL,
                component: CMMSRoutingListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CMMSRoutingDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                ],
            },
        ]
    },

    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

