import { Routes } from '@angular/router';
import {
    ABS_INDEX_URL, CanDeactivateService, LIST_URL
} from '@ss/common/api-common';
import {
    ASSET_BUILDING_URL,
    ASSET_CLASS_URL,
    ASSET_END_TYPE_URL,
    ASSET_LOCATIONS_URL,
    ASSETS_ASSET_URL,
    ASSETS_OFFICES_URL,
    CMMS__PLANS__URL,
    CMMS__PM__URL,
    CMMS_ALERT_URL,
    CMMS_FAULT_CAUSE_URL,
    CMMS_FAULTS_URL,
    CMMS_METER_URL,
    CMMS_PRIORITY_URL,
    CMMS_READING_URL,
    CMMS_ROOT_CAUSE_URL,
    CMMS_ROUTING_URL,
    CMMS_SOLUTION_URL,
    CMMS_STATUS_URL,
    CMMS_TRIGGER_URL,
    CMMS_TYPE_URL,
    CMMS_CUR_WORK_ORDER_URL,
    CMMS_PREV_ORDER_URL,
    COMMON_REPORTS_URL,
    FURNITURE_STATUS_URL,
    CMMS_SERVICE_REQUEST_URL
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
    CMMSSolutionListComponent,
    CMMSSolutionDetailComponent, CMMSRoutingPartsListComponent, CMMSRoutingPartsDetailComponent
} from '@ss/cmms/lookups';
import { CMMSPlanDetailComponent, CMMSPlanListComponent } from '@ss/cmms/plans';
import { CmmsAlertListComponent, PMDetailComponent, PmListComponent } from '@ss/cmms/pm';
import { AssetReadingDetailComponent, AssetReadingListComponent, readingDetailGuard } from '@ss/cmms/asset-readings';
import { AssetTriggerDetailComponent, AssetTriggerListComponent, triggerDetailGuard } from '@ss/cmms/asset-triggers';
import { WorkOrderDetailComponent, WorkOrderListComponent } from '@ss/cmms/work-order';
import {
    AssetBuildingDetailComponent,
    AssetBuildingListComponent,
    AssetClassDetailComponent,
    AssetClassListComponent,
    AssetLocationsDetailComponent,
    AssetLocationsListComponent,
    AssetsDetailComponent,
    AssetsListComponent,
    EndTypesDetailComponent,
    EndTypesListComponent
} from '@ss/assets-component';
import { AppArchiveDetailComponent, AppArchiveListComponent } from '@ss/common/app-archive';
import { FurnitureStatusDetailComponent, FurnitureStatusListComponent } from '@ss/common/ui-lookup';
import { ReportViewComponent } from '@ss/common/ui-report-param';
import { OfficeDetailComponent, OfficesListComponent } from '@ss/organizations/ui-organizations';
import { PrevWorkOrderDetailComponent, PrevWorkOrderListComponent } from '../../../../../libs/cmms/prev-work-order/src';
import { ServiceRequestDetailComponent, ServiceRequestListComponent } from '@ss/cmms/service-request';

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
        path: CMMS_SOLUTION_URL,
        children: [
            {
                path: LIST_URL,
                component: CMMSSolutionListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CMMSSolutionDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },

    {
        path: CMMS_PREV_ORDER_URL,
        children: [
            {
                path: LIST_URL,
                component: PrevWorkOrderListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: PrevWorkOrderDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: CMMS_SERVICE_REQUEST_URL,
        children: [
            {
                path: LIST_URL,
                component: ServiceRequestListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ServiceRequestDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: CMMS_CUR_WORK_ORDER_URL,
        children: [
            {
                path: LIST_URL,
                component: WorkOrderListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: WorkOrderDetailComponent,
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
        path: ASSETS_ASSET_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AssetsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', redirectTo: 'archive', pathMatch: 'full'},
                    {
                        path: 'archive',
                        children: [
                            {path: '', component: AppArchiveListComponent, pathMatch: 'full' },
                            {path: ':id', component: AppArchiveDetailComponent},
                        ]
                    }
                ],
                data: { isCMMS : 'true' }
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
                    },
                    {   path: 'parts',
                        children: [
                            { path: '', component: CMMSRoutingPartsListComponent, pathMatch: 'full' },
                            { path: ':id', component: CMMSRoutingPartsDetailComponent }
                        ]
                    }
                ],
            },
        ]
    },

    {
        path: ASSET_BUILDING_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetBuildingListComponent
            },
            {
                path: ':id',
                component: AssetBuildingDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },

    {
        path: FURNITURE_STATUS_URL,
        children: [
            {
                path: LIST_URL,
                component: FurnitureStatusListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: FurnitureStatusDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ASSET_END_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: EndTypesListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: EndTypesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ASSET_CLASS_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetClassListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AssetClassDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ASSET_LOCATIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetLocationsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AssetLocationsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },

    {
        path: COMMON_REPORTS_URL,
        data: {reportBase: 'cmms'},
        component: ReportViewComponent,
        canActivate: [loginGuard]
    },

    {
        path: ASSETS_OFFICES_URL,
        children: [
            {
                path: LIST_URL,
                component: OfficesListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: OfficeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },

    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

