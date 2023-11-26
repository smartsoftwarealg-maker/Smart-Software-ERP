import { Routes } from '@angular/router';
import { ABS_INDEX_URL, CanDeactivateService, LIST_URL } from '@ss/common/api-common';
import { COSTING_ITEMS_URL } from '../common';
import { loginGuard } from '../erp-guards';
import { CostingItemDetailComponent, CostingItemListComponent } from '@ss/costing/costing-items';

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

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}

];
