import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {
    ABS_COST_TYPES,
    ASSETS_ASSET_URL,
    ASSETS_BLOCKING_URL,
    ASSETS_COST_URL,
    ASSETS_REVALUATION_URL, ASSET_COST_TYPE_URL,
    PAY_ELEMENT_TYPES_URL, ASSET_REVALUATION_TYPE_URL, COMMON_REPORTS_URL
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
    AssetRevaluationTypeListComponent
} from '@ss/assets-component';
import {ReportViewComponent} from '@ss/common/ui-report-param';

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
        path: COMMON_REPORTS_URL,
        data: {reportBase: 'assets'},
        component: ReportViewComponent,
        canActivate: [CanActivateService]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
