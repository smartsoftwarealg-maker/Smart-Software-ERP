import { Route } from '@angular/router';
import {COMMON_CUSTOMER_PROFILE_URL, SS_COMPLAINTS_URL} from "./common";
import {CanDeactivateService, CustomerCanActivateService, LIST_URL} from "@ss/common/api-common";
import {CustomerComplaintsDetailComponent, CustomerComplaintsListComponent} from "@customer-complaints-list";
import {CustomerProfileComponent} from "@ss/logistics/ui-agent";

export const appRoutes: Route[] = [
    {
        path: SS_COMPLAINTS_URL,
        children: [
            {
                path: LIST_URL,
                component: CustomerComplaintsListComponent,
                canActivate: [CustomerCanActivateService]
            },
            {
                path: ':id',
                component: CustomerComplaintsDetailComponent,
                canActivate: [CustomerCanActivateService],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: COMMON_CUSTOMER_PROFILE_URL,
        component: CustomerProfileComponent,
        canActivate: [CustomerCanActivateService],
    },

];
