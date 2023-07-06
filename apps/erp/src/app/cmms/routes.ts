import { Routes } from '@angular/router';
import {
    ABS_INDEX_URL, CanDeactivateService, LIST_URL
} from '@ss/common/api-common';
import {
    CMMS__PLANS__URL, CMMS__PM__URL, CMMS_ALERT_URL,
    CMMS_FAULT_CAUSE_URL,
    CMMS_FAULTS_URL, CMMS_METER_URL,
    CMMS_PRIORITY_URL, CMMS_READING_URL,
    CMMS_ROOT_CAUSE_URL,
    CMMS_ROUTING_URL,
    CMMS_STATUS_URL, CMMS_TRIGGER_URL,
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
    CMMSRootCauseDetailComponent,
    CMMSRoutingDetailComponent,
    CMMSRoutingListComponent,
    CMMSTypeDetailComponent,
    CMMSTypeListComponent,
    CMMSRootCauseListComponent,
    CMMSRoutingLineListComponent,
    CMMSRoutingLineDetailComponent,
    CMMSMeterListComponent,
    CMMSMeterDetailComponent,
} from '@ss/cmms/lookups';
import { CMMSPlanDetailComponent, CMMSPlanListComponent } from '@ss/cmms/plans';
import { CmmsAlertListComponent, PMDetailComponent, PmListComponent } from '@ss/cmms/pm';
import { AssetReadingDetailComponent, AssetReadingListComponent, readingDetailGuard } from '@ss/cmms/asset-readings';
import { AssetTriggerDetailComponent, AssetTriggerListComponent, triggerDetailGuard } from "@ss/cmms/asset-triggers";

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
        path: CMMS_METER_URL,
        children: [
            {
                path: LIST_URL,
                component: CMMSMeterListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CMMSMeterDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: CMMS_ALERT_URL,
        children: [
            {
                path: LIST_URL,
                component: CmmsAlertListComponent,
                canActivate: [loginGuard]
            }
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
        path: CMMS_READING_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetReadingListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AssetReadingDetailComponent,
                canActivate: [loginGuard, readingDetailGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },

    {
        path: CMMS_TRIGGER_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetTriggerListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AssetTriggerDetailComponent,
                canActivate: [loginGuard, triggerDetailGuard],
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
        path: CMMS__PLANS__URL,
        children: [
            {
                path: LIST_URL,
                component: CMMSPlanListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CMMSPlanDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },

    {
        path: CMMS__PM__URL,
        children: [
            {
                path: LIST_URL,
                component: PmListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: PMDetailComponent,
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
                    {   path: '',
                        redirectTo: 'detail',
                        pathMatch: 'full',
                    },
                    {   path: 'detail',
                        children: [
                            { path: '', component: CMMSRoutingLineListComponent, pathMatch: 'full'},
                            { path: ':id', component: CMMSRoutingLineDetailComponent }
                        ]
                    }
                ],
            },
        ]
    },

    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

