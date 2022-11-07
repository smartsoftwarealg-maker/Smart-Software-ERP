import { Routes } from '@angular/router';
import {
    COMMON_CUSTOMER_PROFILE_URL, COMMON_REPORTS_URL,
    CSPACE_CART_URL,
    CSPACE_CARTDETAIL_URL, FOOD_CART_URL, FOOD_CARTDETAIL_URL, PAYPAL_CHECKOUT_URL, PAYPAL_REVIEW_URL
} from '../common';
import {ABS_INDEX_URL, CanActivateService, LIST_URL} from '@ss/common/api-common';
import {CustomerProfileComponent} from '@ss/logistics/ui-agent';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {FoodCartDetailComponent} from '@ss/sales/food-cart';
import {CheckoutComponent, ReviewComponent} from '../../../../../libs/sales/paypal/src';

export const mainRoutes: Routes = [
    {
        path: FOOD_CART_URL,
        component: FoodCartDetailComponent,
        canActivate: [CanActivateService],
    },
    {
        path: FOOD_CARTDETAIL_URL,
        component: FoodCartDetailComponent,
        canActivate: [CanActivateService],
    },
    {
        path: PAYPAL_CHECKOUT_URL,
        component: CheckoutComponent,
    },
    {
        path: PAYPAL_REVIEW_URL,
        component: ReviewComponent,
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
                data: { reportBase: 'food' },
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
