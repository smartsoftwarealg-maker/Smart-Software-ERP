import {
    ABS_INDEX_URL,
    CanDeactivateService,
    LIST_URL
} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {
    ASSETS_ASSET_URL,
    ASSETS_BLOCKING_URL,
    ASSETS_COST_URL,
    ASSETS_REVALUATION_URL,
    ASSET_COST_TYPE_URL,
    ASSET_REVALUATION_TYPE_URL,
    COMMON_REPORTS_URL,
    ASSET_LOCATIONS_URL,
    ADMINISTRATION_REPORT_CATALOG_URL,
    ASSETS_OFFICES_URL,
    ASSET_CLASS_URL,
    ASSET_OPTIONS_URL,
    ASSET_RECEPTIONS_URL,
    ASSETS_APPOINTMENTS_DOC_URL,
    ASSET_INVENTORY_URL,
    LOGISTICS_ACTIVITY_URL,
    ASSET_BLOCKING_TYPE_URL,
    ASSET_BUILDING_URL,
    LOGISTICS_AGENT_URL,
    ASSET_ACCOUNT_URL,
    ASSET_END_TYPE_URL,
    FURNITURE_STATUS_URL,
    ASSETS_SEARCH_URL,
    ASSETS_INJECTION_URL,
    ASSETS_DEPRECIATION_URL,
    COMMON_MARKS_URL, docInfoRoutes, DASHBOARD_URL, ASSET_TRANSFER_URL, CMMS_ASSET_TREE, ASSET_QR_INVENTORY_URL
} from '../common';
import {
    AssetCostsDetailComponent,
    AssetCostsListComponent,
    AssetsDetailComponent,
    AssetsListComponent,
    AssetRevaluationListComponent,
    AssetRevaluationDetailComponent,
    AssetBlockingListComponent,
    AssetBlockingDetailComponent,
    AssetCostTypeListComponent,
    AssetCostTypeDetailComponent,
    AssetRevaluationTypeDetailComponent,
    AssetRevaluationTypeListComponent,
    AssetLocationsListComponent,
    AssetLocationsDetailComponent,
    AssetClassListComponent,
    AssetClassDetailComponent,
    AssetOptionsComponent,
    AssetReceptionsComponent,
    AssetAppointmentDocListComponent,
    AssetAppointmentDocDetailComponent,
    AssetInventoryDetailComponent,
    AssetInventoryListComponent,
    AssetBlockingTypeListComponent,
    AssetBlockingTypeDetailComponent,
    AssetBuildingListComponent,
    AssetBuildingDetailComponent,
    AssetReceptionsDetailComponent,
    EndTypesListComponent,
    EndTypesDetailComponent,
    SearchListComponent,
    AssetExcelInjectionComponent,
    DepreciationRateListComponent,
    DepreciationRateDetailComponent,
    AssetsTransferComponent, AssetTreeComponent, AssetListInventoryComponent
} from '@ss/assets-component';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {ReportCatalogListComponent, ReportCatalogDetailComponent} from '@ss/administration/ui-report-catalog';
import {OfficeDetailComponent, OfficesListComponent} from '@ss/organizations/ui-organizations';
import {
    AgentListComponent,
    AgentDetailComponent,
    AppArchiveListComponent,
    AppArchiveDetailComponent
} from '@ss/logistics/ui-agent';
import {
    ActivityDetailComponent,
    ActivityListComponent,
    FurnitureStatusDetailComponent,
    FurnitureStatusListComponent, MarkDetailComponent, MarkListComponent
} from '@ss/common/ui-lookup';
import {
    AssetAccountsDetailComponent,
    AssetAccountsListComponent
} from '@ss/accounting/accounting-accounts';
import {DashboardComponent} from '@ss/dashboard';
import {loginGuard} from '../erp-guards';
import { AGENT_ARCHIVES, ASSET_ARCHIVES, ASSET_RECEPTIONS_ARCHIVES } from '@ss/common/app-archive';

export const mainRoutes: Routes = [
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
                children: [
                    {
                        path: '',
                        component: AssetsDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        children: [
                            {
                                path: 'archive',
                                children: [
                                    { path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: ASSET_ARCHIVES } },
                                    { path: ':id', component: AppArchiveDetailComponent, data: { appId: ASSET_ARCHIVES } },
                                ]
                            },
                            {
                                path: 'costs',
                                children: [
                                    {path: '', component: AssetCostsListComponent, pathMatch: 'full'},
                                    {path: ':id', component: AssetCostsDetailComponent},
                                ]
                            },
                            {
                                path: 'revaluations',
                                children: [
                                    {path: '', component: AssetRevaluationListComponent, pathMatch: 'full'},
                                    {path: ':id', component: AssetRevaluationDetailComponent},
                                ]
                            },
                            {
                                path: 'blockings',
                                children: [
                                    {path: '', component: AssetBlockingListComponent, pathMatch: 'full'},
                                    {path: ':id', component: AssetBlockingDetailComponent},
                                ]
                            },
                            {
                                path: 'depreciation-rate',
                                children: [
                                    {path: '', component: DepreciationRateListComponent, pathMatch: 'full'},
                                    {path: ':id', component: DepreciationRateDetailComponent},
                                ]
                            }
                        ]
                    },
                    {
                        path: ASSETS_COST_URL,
                        children: [
                            {
                                path: '',
                                component: AssetCostsListComponent
                            },
                            {
                                path: ':id',
                                component: AssetCostsDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: ASSETS_DEPRECIATION_URL,
                        children: [
                            {
                                path: '',
                                component: DepreciationRateListComponent
                            },
                            {
                                path: ':id',
                                component: DepreciationRateDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: ASSETS_REVALUATION_URL,
                        children: [
                            {
                                path: '',
                                component: AssetRevaluationListComponent
                            },
                            {
                                path: ':id',
                                component: AssetRevaluationDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: ASSETS_BLOCKING_URL,
                        children: [
                            {
                                path: '',
                                component: AssetBlockingListComponent
                            },
                            {
                                path: ':id',
                                component: AssetBlockingDetailComponent,
                                canActivate: [loginGuard],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    }
                ]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: LOGISTICS_ACTIVITY_URL,
        children: [
            {
                path: LIST_URL,
                component: ActivityListComponent
            },
            {
                path: ':id',
                component: ActivityDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
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
        path: ASSET_COST_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetCostTypeListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AssetCostTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ASSET_BLOCKING_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetBlockingTypeListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AssetBlockingTypeDetailComponent,
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
        path: ASSET_REVALUATION_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetRevaluationTypeListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AssetRevaluationTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ADMINISTRATION_REPORT_CATALOG_URL,
        children: [
            {
                path: LIST_URL,
                component: ReportCatalogListComponent,
                canActivate: [loginGuard],
                data: {app: 'assets'}
            },
            {
                path: ':id',
                component: ReportCatalogDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: COMMON_REPORTS_URL,
        data: {reportBase: 'assets'},
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
    {
        path: ASSETS_APPOINTMENTS_DOC_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetAppointmentDocListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AssetAppointmentDocDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ASSET_OPTIONS_URL,
        component: AssetOptionsComponent
    },
    {
        path: ASSET_TRANSFER_URL,
        component: AssetsTransferComponent,
    },
    {
        path: ASSETS_SEARCH_URL,
        component: SearchListComponent
    },
    {
        path: ASSETS_INJECTION_URL,
        component: AssetExcelInjectionComponent
    },
    {
        path: ASSET_QR_INVENTORY_URL,
        component: AssetListInventoryComponent
    },
    {
        path: ASSET_INVENTORY_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetInventoryListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AssetInventoryDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ASSET_RECEPTIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetReceptionsComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: AssetReceptionsDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        data: {sales: true},
                        children: [
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: ASSET_RECEPTIONS_ARCHIVES }},
                                    {path: ':id', component: AppArchiveDetailComponent, data: { appId: ASSET_RECEPTIONS_ARCHIVES }},
                                ]
                            }
                        ]
                    }
                ]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ASSET_RECEPTIONS_URL,
        component: AssetReceptionsComponent,

    },
    {
        path: LOGISTICS_AGENT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [loginGuard],
                data: {sales: true, assets: true},
                children: docInfoRoutes
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: AgentDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        data: {sales: false},
                        children: [
                            {path: '', redirectTo: 'archive', pathMatch: 'full'},
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: AGENT_ARCHIVES }},
                                    {path: ':id', component: AppArchiveDetailComponent, data: { appId: AGENT_ARCHIVES }},
                                ]
                            }
                        ]
                    }
                ]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },

    {
        path: ASSET_ACCOUNT_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetAccountsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AssetAccountsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },

    {
        path: COMMON_MARKS_URL,
        children: [
            {
                path: LIST_URL,
                component: MarkListComponent
            },
            {
                path: ':id',
                component: MarkDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: CMMS_ASSET_TREE, component: AssetTreeComponent
    },
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [loginGuard],
    },

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
