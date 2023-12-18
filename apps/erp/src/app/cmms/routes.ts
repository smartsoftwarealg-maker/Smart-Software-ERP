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
    CMMS_SERVICE_REQUEST_URL,
    STOCK_PARTS_REQUEST_URL,
    docInfoRoutes,
    CMMS_CHARTS_URL,
    CMMS_ASSET_TREE,
    CMMS_EMPLOYEES_URL,
    CMMS_FUNCTION_URL,
    CMMS_CHECKLIST_URL,
    CMMS_INSPECTION_ORDER_URL,
    CMMS_INSPECTION_URL,
    CMMS_GANT_URL, ASSETS_ASSET_PM_URL, CMMS_PERMIT_TYPE_URL
} from "../common";
import { loginGuard } from '../erp-guards';
import {
    CmmsFaultCauseDetailComponent,
    CMMSFaultCauseListComponent,
    CMMSFaultDetailComponent,
    CMMSFaultListComponent,
    CMMSPriorityDetailComponent,
    CMMSPriorityListComponent,
    CMMSRootCauseDetailComponent,
    CMMSTypeDetailComponent,
    CMMSTypeListComponent,
    CMMSRootCauseListComponent,
    CMMSMeterListComponent,
    CMMSMeterDetailComponent,
    CMMSSolutionListComponent,
    CMMSSolutionDetailComponent,
    CMMSRoutingPartsListComponent,
    CMMSRoutingPartsDetailComponent,
    CMMSRoutingArchiveComponent,
    CMMSFunctionListComponent,
    CMMSFunctionDetailComponent,
    CmmsPermitTypeListComponent,
    CMMSPermitTypeDetailComponent
} from "@ss/cmms/lookups";
import { CMMSPlanDetailComponent, CMMSPlanListComponent } from '@ss/cmms/plans';
import { CmmsAlertListComponent, PMDetailComponent, PmListComponent } from '@ss/cmms/pm';
import {
    AssetChildReadingDetailComponent,
    AssetChildReadingListComponent,
    AssetReadingDetailComponent,
    AssetReadingListComponent,
    readingDetailGuard
} from '@ss/cmms/asset-readings';
import { AssetTriggerDetailComponent, AssetTriggerListComponent, triggerDetailGuard } from '@ss/cmms/asset-triggers';
import {
    InspectionDetailComponent,
    InspectionDetailListComponent,
    InspectionOrderDetailComponent,
    InspectionOrderListComponent,
    WorkOrderArticleDetailComponent,
    WorkOrderArticleListComponent,
    WorkOrderDetailComponent,
    WorkOrderListComponent,
    WorkPersonsDetailComponent,
    WorkPersonsListComponent
} from '@ss/cmms/work-order';
import {
    AssetBuildingDetailComponent,
    AssetBuildingListComponent,
    AssetClassDetailComponent,
    AssetClassListComponent,
    AssetLocationsDetailComponent,
    AssetLocationsListComponent,
    AssetTreeComponent,
    EndTypesDetailComponent,
    EndTypesListComponent
} from '@ss/assets-component';
import {
    AGENT_ARCHIVES,
    AppArchiveDetailComponent,
    AppArchiveListComponent,
    ASSET_ARCHIVES,
    CMMS_ROUTING_ARCHIVES
} from '@ss/common/app-archive';
import { FurnitureStatusDetailComponent, FurnitureStatusListComponent } from '@ss/common/ui-lookup';
import { ReportViewComponent } from '@ss/common/ui-report-param';
import { OfficeDetailComponent, OfficesListComponent } from '@ss/organizations/ui-organizations';
import { ServiceRequestDetailComponent, ServiceRequestListComponent } from '@ss/cmms/service-request';
import {
    PartsRequestDetailComponent, PartsRequestLineDetailComponent,
    PartsRequestLineListComponent,
    PartsRequestListComponent
} from '@ss/stock/ui-parts-request';
import { CMMSChartsComponent, CmmsGanttComponent } from '@ss/cmms/cmms-charts';
import { CmmsEmployeeDetailComponent, CmmsEmployeeListComponent } from '@ss/cmms/cmms-employees';
import {
    AssetPmArticleDetailComponent, AssetPmArticleListComponent,
    AssetPmDetailComponent,
    AssetPmListComponent,
    CmmsAssetListComponent,
    CmmsAssetPmDetailComponent
} from '@ss/cmms/cmms-assets';
import {
    CmmsAssetDetailComponent
} from '@ss/cmms/cmms-assets';
import { PrevWorkOrderDetailComponent, PrevWorkOrderListComponent } from '@ss/cmms/prev-work-order';
import {
    PersonFaultListComponent
} from '@ss/cmms/cmms-employees';
import {
    PersonFaultDetailComponent
} from '@ss/cmms/cmms-employees';
import {
    PersonLocationListComponent
} from '@ss/cmms/cmms-employees';
import {
    PersonLocationDetailComponent
} from '@ss/cmms/cmms-employees';
import {
    CMMSRoutingDetailComponent, CMMSRoutingLineDetailComponent,
    CMMSRoutingLineListComponent,
    CMMSRoutingListComponent
} from '@ss/cmms/cmms-routing';
import {
    CMMSChecklistDetailComponent, CmmsChecklistLineDetailComponent, CmmsChecklistLineListComponent,
    CmmsChecklistListComponent
} from '@ss/cmms/cmms-checklists';
import {
    WorkPermitListComponent
} from "../../../../../libs/cmms/work-order/src/lib/work-permit-list/work-permit-list.component";
import {
    WorkPermitDetailComponent
} from "../../../../../libs/cmms/work-order/src/lib/work-permit-detail/work-permit-detail.component";


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
        path: CMMS_PERMIT_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: CmmsPermitTypeListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CMMSPermitTypeDetailComponent,
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
        path: CMMS_FUNCTION_URL,
        children: [
            {
                path: LIST_URL,
                component: CMMSFunctionListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CMMSFunctionDetailComponent,
                canActivate: [loginGuard],
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
                children: [
                    { path: 'articles',
                        children: [
                            { path: '', component: WorkOrderArticleListComponent, pathMatch: 'full'},
                            { path: ':id', component: WorkOrderArticleDetailComponent }
                        ]
                    },
                    { path: 'works',
                        children: [
                            { path: '', component: WorkPersonsListComponent, pathMatch: 'full'},
                            { path: ':id', component: WorkPersonsDetailComponent }
                        ]
                    },
                    { path: 'readings',
                        children: [
                            { path: '', component: AssetChildReadingListComponent, pathMatch: 'full'},
                            { path: ':id', component: AssetChildReadingDetailComponent }
                        ]
                    },
                    { path: 'permits',
                        children: [
                            { path: '', component: WorkPermitListComponent, pathMatch: 'full'},
                            { path: ':id', component: WorkPermitDetailComponent }
                        ]
                    }
                ]
            },
        ]
    },

    {
        path: CMMS_INSPECTION_ORDER_URL,
        children: [
            {
                path: LIST_URL,
                component: InspectionOrderListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: InspectionOrderDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: 'inspections',
                        children: [
                            { path: '', component: InspectionDetailListComponent, pathMatch: 'full'},
                        ]
                    }
                ]
            },
        ]
    },

    {
        path: CMMS_INSPECTION_URL,
        children: [
            {
                path: LIST_URL,
                component: InspectionOrderListComponent,
                canActivate: [loginGuard],
                data: {inspection: 'true'}
            },
            {
                path: ':id',
                component: InspectionDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: 'inspections',
                        children: [
                            // { path: '', component: InspectionListComponent, pathMatch: 'full'},
                        ]
                    }
                ]
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
                component: CmmsAssetListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CmmsAssetDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    {
                        path: 'archive',
                        children: [
                            {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: ASSET_ARCHIVES } },
                            {path: ':id', component: AppArchiveDetailComponent, data: { appId: ASSET_ARCHIVES }},
                        ]
                    },
                    {
                        path: 'pm',
                        children: [
                            {path: '', component: AssetPmListComponent, pathMatch: 'full' },
                            {path: ':id', component: AssetPmDetailComponent},
                        ]
                    },
                    {
                        path: 'triggers',
                        children: [
                            {path: '', component: AssetTriggerListComponent, pathMatch: 'full' },
                            {path: ':id', component: AssetTriggerDetailComponent},
                        ]
                    },
                    {
                        path: 'inspection',
                        children: [
                            {   path: '',
                                component: AssetPmListComponent,
                                pathMatch: 'full',
                                data: { inspection: true }
                            },
                            {path: ':id', component: AssetPmDetailComponent, data: { inspection: true } },
                        ]
                    }
                ],
                data: { isCMMS : 'true' }
            },
        ]
    },

    {
        path: ASSETS_ASSET_PM_URL,
        children: [
            {
                path: LIST_URL,
                component: CmmsAssetListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CmmsAssetPmDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: 'articles',
                        children: [
                            { path: '', component: AssetPmArticleListComponent, pathMatch: 'full'},
                            { path: ':id', component: AssetPmArticleDetailComponent }
                        ]
                    },
                    {
                        path: 'archive',
                        children: [
                            {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: ASSET_ARCHIVES } },
                            {path: ':id', component: AppArchiveDetailComponent, data: { appId: ASSET_ARCHIVES }},
                        ]
                    },
                    {
                        path: 'pm',
                        children: [
                            {path: '', component: AssetPmListComponent, pathMatch: 'full' },
                            {path: ':id', component: AssetPmDetailComponent},
                        ]
                    },
                    {
                        path: 'triggers',
                        children: [
                            {path: '', component: AssetTriggerListComponent, pathMatch: 'full' },
                            {path: ':id', component: AssetTriggerDetailComponent},
                        ]
                    },
                    {
                        path: 'inspection',
                        children: [
                            {   path: '',
                                component: AssetPmListComponent,
                                pathMatch: 'full',
                                data: { inspection: true }
                            },
                            {path: ':id', component: AssetPmDetailComponent, data: { inspection: true } },
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
                    },
                    {   path: 'archive',
                        component: CMMSRoutingArchiveComponent,
                        children: [
                            {path: '',    component: AppArchiveListComponent, pathMatch: 'full', data: { appId: CMMS_ROUTING_ARCHIVES } },
                            {path: ':id', component: AppArchiveDetailComponent, data: { appId: CMMS_ROUTING_ARCHIVES }},
                        ]
                    }
                ],
            },
        ]
    },
    {
        path: CMMS_CHECKLIST_URL,
        children: [
            {
                path: LIST_URL,
                component: CmmsChecklistListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CMMSChecklistDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    {   path: '',
                        redirectTo: 'detail',
                        pathMatch: 'full',
                    },
                    {   path: 'detail',
                        children: [
                            { path: '', component: CmmsChecklistLineListComponent, pathMatch: 'full', data: { appId: CMMS_ROUTING_ARCHIVES }},
                            { path: ':id', component: CmmsChecklistLineDetailComponent, data: { appId: CMMS_ROUTING_ARCHIVES } }
                        ]
                    },
                    {   path: 'archive',
                        component: CMMSRoutingArchiveComponent,
                        children: [
                            {path: '',    component: AppArchiveListComponent, pathMatch: 'full', data: { appId: CMMS_ROUTING_ARCHIVES } },
                            {path: ':id', component: AppArchiveDetailComponent, data: { appId: CMMS_ROUTING_ARCHIVES }},
                        ]
                    }
                ],
            },
        ]
    },
    {
        path: STOCK_PARTS_REQUEST_URL,
        children: [
            {
                path: LIST_URL,
                component: PartsRequestListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: PartsRequestDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    { path: 'lines-list',
                        component: PartsRequestLineListComponent,
                        children: docInfoRoutes
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            { path: ':id', component: PartsRequestLineDetailComponent },
                        ]
                    },
                    ...docInfoRoutes
                ]
            },
        ]
    },

    {
        path: ASSET_BUILDING_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetBuildingListComponent,
                data: { title: 'CMMS_ZONES'}
            },
            {
                path: ':id',
                component: AssetBuildingDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                data: { title: 'CMMS_ZONES'}
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
                data: { title: 'ASSET_SITES'},
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AssetLocationsDetailComponent,
                canActivate: [loginGuard],
                data: { title: 'ASSET_SITES'},
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
                canActivate: [loginGuard],
                data: { title: 'CMMS_ZONES'}
            },
            {
                path: ':id',
                component: OfficeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                data: { title: 'CMMS_ZONES'}
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: CMMS_CHARTS_URL, component: CMMSChartsComponent
    },
    {
        path: CMMS_GANT_URL, component: CmmsGanttComponent
    },
    {
        path: CMMS_ASSET_TREE, component: AssetTreeComponent
    },
    {
        path: CMMS_EMPLOYEES_URL,
        children: [
            {
                path: LIST_URL,
                component: CmmsEmployeeListComponent,
                canActivate: [loginGuard],
                data: { active: true }
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: CmmsEmployeeDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        data: { hrMode: true, active: true },
                        children: [
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: AGENT_ARCHIVES } },
                                    {path: ':id', component: AppArchiveDetailComponent, data: { appId: AGENT_ARCHIVES }},
                                ]
                            },
                            {
                                path: 'faults',
                                children: [
                                    {path: '', component: PersonFaultListComponent, pathMatch: 'full' },
                                    {path: ':id', component: PersonFaultDetailComponent},
                                ]
                            },
                            {
                                path: 'locations',
                                children: [
                                    {path: '', component: PersonLocationListComponent, pathMatch: 'full' },
                                    {path: ':id', component: PersonLocationDetailComponent},
                                ]
                            },
                        ]
                    },
                ]
            },
            { path: '**', redirectTo: LIST_URL }
        ]
    },

    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

