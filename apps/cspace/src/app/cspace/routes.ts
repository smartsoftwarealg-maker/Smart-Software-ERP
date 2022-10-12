import {COMMON_CUSTOMER_PROFILE_URL, COMMON_REPORT_PARAMS_URL, CSPACE_CART_URL, CSPACE_CARTDETAIL_URL} from '../common';
import {Routes} from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, LIST_URL} from '@ss/common/api-common';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {CustomerProfileComponent} from "@ss/logistics/ui-agent";
import {ShoppingCartComponent, ShoppingCartDetailComponent} from "@ss/sales/shopping-cart";

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
        path: COMMON_REPORT_PARAMS_URL,
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
