import { Routes } from '@angular/router';
import { ABS_INDEX_URL, CanDeactivateService, LIST_URL } from '@ss/common/api-common';
import { COSTING_ITEMS_URL, COSTING_KEY_URL } from '../common';
import { loginGuard } from '../erp-guards';
import { CostingItemDetailComponent, CostingItemListComponent } from '@ss/costing/costing-items';
import { CostingKeyDetailComponent, CostingKeyListComponent } from 'costing/costing-keys';

export const costingRoutes: Routes = [
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
