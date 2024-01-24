import { Routes } from '@angular/router';
import { ABS_INDEX_URL, CanDeactivateService, LIST_URL } from '@ss/common/api-common';
import {
    BOM_URL,
    CMMS_ROUTING_URL,
    COSTING_FINAL_PRODUCT,
    COSTING_ITEMS_URL,
    COSTING_KEY_URL,
    COSTING_PRODUCTS_URL,
    COSTING_PROJECT_URL,
    STOCK_COST_CENTER_URL
} from '../common';
import { loginGuard } from '../erp-guards';
import { CostingItemDetailComponent, CostingItemListComponent } from '@ss/costing/costing-items';
import { CostingKeyDetailComponent, CostingKeyListComponent } from '@ss/costing/costing-keys';
import { CostingProductDetailComponent, CostingProductListComponent } from '@ss/costing/costing-products';
import {
    CostingOhDetailComponent,
    CostingOhLineComponent,
    CostingPoolDetailComponent,
    CostingPoolListComponent,
    CostingProjectDetailComponent,
    CostingProjectListComponent,
    CostingReportsComponent,
    ProductLineDetailComponent,
    ProductLineListComponent
} from '@ss/costing/costing-projects';
import {
    BomComponent,
    ChildBomComponent,
    FinalProductDetailComponent,
    FinalProductListComponent
} from '@ss/master-data/ui-article';
import {
    CMMSRoutingDetailComponent,
    CMMSRoutingLineDetailComponent,
    CMMSRoutingLineListComponent,
    CMMSRoutingListComponent
} from '@ss/master-data/cmms-routing';
import { CostCenterDetailComponent, CostCenterListComponent } from '@ss/logistics/ui-cost-center';

export const costingRoutes: Routes = [
    {
        path: COSTING_PROJECT_URL,
        children: [
            {
                path: LIST_URL,
                component: CostingProjectListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CostingProjectDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    {
                        path: 'pools',
                        children: [
                            { path: '', component: CostingPoolListComponent, pathMatch: 'full' },
                            { path: ':id', component: CostingPoolDetailComponent }
                        ]
                    },
                    {
                        path: 'products',
                        children: [
                            { path: '', component: ProductLineListComponent, pathMatch: 'full' },
                            { path: ':id', component: ProductLineDetailComponent }
                        ]
                    },
                    {
                        path: 'oh',
                        children: [
                            { path: '', component: CostingOhLineComponent, pathMatch: 'full' },
                            { path: ':id', component: CostingOhDetailComponent }
                        ]
                    },
                    {
                        path: 'reports', component: CostingReportsComponent
                    },
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: COSTING_FINAL_PRODUCT,
        children: [
            {
                path: LIST_URL,
                component: FinalProductListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: FinalProductDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', component: ChildBomComponent, pathMatch: 'full'}
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: COSTING_PRODUCTS_URL,
        children: [
            {
                path: LIST_URL,
                component: CostingProductListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CostingProductDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: STOCK_COST_CENTER_URL,
        children: [
            {
                path: LIST_URL,
                component: CostCenterListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CostCenterDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: COSTING_ITEMS_URL,
        children: [
            {
                path: LIST_URL,
                component: CostingItemListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CostingItemDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: COSTING_KEY_URL,
        children: [
            {
                path: LIST_URL,
                component: CostingKeyListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CostingKeyDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
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
                ],
            },
        ]
    },

    {
        path: BOM_URL, component: BomComponent
    },

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}

];
