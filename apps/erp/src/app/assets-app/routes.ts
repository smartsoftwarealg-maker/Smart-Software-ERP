import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {
    ABS_COST_TYPES,
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
    ASSETS_APPOINTMENTS_URL,
    ASSET_OPTIONS_URL,
    ASSET_RECEPTIONS_URL
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
    AssetAppointmentListComponent,
    AssetAppointmentDetailComponent,
    AssetOptionsComponent, AssetReceptionsComponent
} from '@ss/assets-component';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {ReportCatalogListComponent, ReportCatalogDetailComponent} from '@ss/administration/ui-report-catalog';
import {AccountingPeriodGuard} from '@ss/accounting/accounting-api';
import {OfficeDetailComponent, OfficesListComponent} from '@ss/organizations/ui-organizations';

export const mainRoutes: Routes = [
    {
        path: ASSETS_ASSET_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetsListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: AssetsDetailComponent,
                        canActivate: [CanActivateService],
                        canDeactivate: [CanDeactivateService]
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
                                canActivate: [CanActivateService],
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
                                canActivate: [CanActivateService],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    },
                    {
                        path: ASSETS_APPOINTMENTS_URL,
                        children: [
                            {
                                path: '',
                                component: AssetAppointmentListComponent
                            },
                            {
                                path: ':id',
                                component: AssetAppointmentDetailComponent,
                                canActivate: [CanActivateService],
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
                                canActivate: [CanActivateService],
                                canDeactivate: [CanDeactivateService]
                            }
                        ]
                    }
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ASSET_COST_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetCostTypeListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AssetCostTypeDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ASSET_CLASS_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetClassListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AssetClassDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ASSET_LOCATIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetLocationsListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AssetLocationsDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ASSET_REVALUATION_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetRevaluationTypeListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AssetRevaluationTypeDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ADMINISTRATION_REPORT_CATALOG_URL,
        children: [
            {
                path: LIST_URL,
                component: ReportCatalogListComponent,
                canActivate: [CanActivateService],
                data: { app: 'assets' }
            },
            {
                path: ':id',
                component: ReportCatalogDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: COMMON_REPORTS_URL,
        data: { reportBase: 'assets' },
        component: ReportViewComponent,
        canActivate: [CanActivateService, AccountingPeriodGuard]
    },
    {
        path: ASSETS_OFFICES_URL,
        children: [
            {
                path: LIST_URL,
                component: OfficesListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: OfficeDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ASSET_OPTIONS_URL,
        component: AssetOptionsComponent
    },
    {
        path: ASSET_RECEPTIONS_URL,
        component: AssetReceptionsComponent
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
