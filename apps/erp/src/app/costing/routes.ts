import { Routes } from '@angular/router';
import { ABS_INDEX_URL, CanDeactivateService, LIST_URL } from '@ss/common/api-common';
import { COSTING_ITEMS_URL, COSTING_KEY_URL, COSTING_PRODUCTS_URL, COSTING_PROJECT_URL } from '../common';
import { loginGuard } from '../erp-guards';
import { CostingItemDetailComponent, CostingItemListComponent } from '@ss/costing/costing-items';
import { CostingKeyDetailComponent, CostingKeyListComponent } from '@ss/costing/costing-keys';
import { CostingProductDetailComponent, CostingProductListComponent } from '@ss/costing/costing-products';
import { CostingProjectDetailComponent, CostingProjectListComponent } from '@ss/costing/costing-projects';

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

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}

];
