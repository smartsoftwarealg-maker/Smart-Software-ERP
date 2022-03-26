import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {ASSETS_ASSET_URL, ASSETS_COST_URL, ASSETS_REVALUATION_URL} from '../common';
import {
    AssetCostsDetailComponent,
    AssetCostsListComponent,
    AssetsDetailComponent,
    AssetsListComponent,
    AssetRevaluationListComponent,
    AssetRevaluationDetailComponent
} from '@ss/assets-component';

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
                    }
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
