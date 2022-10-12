import { Routes } from '@angular/router';
import {
    COMMON_CUSTOMER_PROFILE_URL, COMMON_REPORTS_URL,
    CSPACE_CART_URL,
    CSPACE_CARTDETAIL_URL
} from '../common';
import {ShoppingCartComponent, ShoppingCartDetailComponent} from '@ss/sales/shopping-cart';
import {ABS_INDEX_URL, CanActivateService, LIST_URL} from '@ss/common/api-common';
import {CustomerProfileComponent} from '@ss/logistics/ui-agent';
import {ReportViewComponent} from '@ss/common/ui-report-param';

export const mainRoutes: Routes = [
    {
        path: CSPACE_CART_URL,
        component: ShoppingCartComponent,
        canActivate: [CanActivateService],
    },
    {
        path: CSPACE_CARTDETAIL_URL,
        component: ShoppingCartDetailComponent,
        canActivate: [CanActivateService],
    },
    {
        path: COMMON_CUSTOMER_PROFILE_URL,
        component: CustomerProfileComponent,
        canActivate: [CanActivateService],
    },
    {
        path: COMMON_REPORTS_URL,
        children: [
            {
                path: LIST_URL,
                data: { reportBase: 'cspace' },
                component: ReportViewComponent,
                canActivate: [CanActivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}

];
