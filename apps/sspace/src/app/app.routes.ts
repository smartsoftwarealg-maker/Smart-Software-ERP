import { Route } from '@angular/router';
import {COMMON_CUSTOMER_PROFILE_URL, SS_CUSTOMER_COMPLAINTS_URL} from "./common";
import {
    AUTH_2FA_URL, BLOCKED_REASON_PAGE_URL,
    CanActivateService,
    CanDeactivateService, CENTER_SELECT_URL,
    CustomerCanActivateService,
    INDEX_PAGE_URL,
    LIST_URL, LOGIN_URL,
    MAIN_PAGE_URL, UPDATE_PASSWORD_URL
} from "@ss/common/api-common";
import {CustomerComplaintsDetailComponent, CustomerComplaintsListComponent} from "@customer-complaints-list";
import {CustomerProfileComponent} from "@ss/logistics/ui-agent";
import {ShellComponent} from "@ss/common/ui-shell";
import {MainPageComponent} from "@ss/common/ui-main-page";
import {LoginComponent} from "@ss/common/ui-login";
import {BlockedReasonComponent, CenterSelectComponent} from "@ss/common/ui-center-select";
import {Auth2FAConfirmationComponent, PasswordUpdateComponent} from "@ss/auth-2fa";
import {restCodeGuard} from "../../../cspace/customer-guards";

export const appRoutes: Route[] = [
    {
        path: MAIN_PAGE_URL,
        component: ShellComponent,
        children: [
            {
                path: INDEX_PAGE_URL,
                component: MainPageComponent,
                canActivate: [CanActivateService]
            },
            {
                path: SS_CUSTOMER_COMPLAINTS_URL,
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

            { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
            { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
        ]
    },
    { path: LOGIN_URL, component: LoginComponent},
    { path: CENTER_SELECT_URL, component: CenterSelectComponent },
    { path: UPDATE_PASSWORD_URL, component: PasswordUpdateComponent, canDeactivate:[restCodeGuard] },
    { path: AUTH_2FA_URL, component: Auth2FAConfirmationComponent },
    { path: BLOCKED_REASON_PAGE_URL, component: BlockedReasonComponent },
    { path: '', redirectTo: LOGIN_URL, pathMatch: 'full' },
    { path: '**', redirectTo: LOGIN_URL, pathMatch: 'full' }
    // {
    //     path: SS_COMPLAINTS_URL,
    //     children: [
    //         {
    //             path: LIST_URL,
    //             component: CustomerComplaintsListComponent,
    //             canActivate: [CustomerCanActivateService]
    //         },
    //         {
    //             path: ':id',
    //             component: CustomerComplaintsDetailComponent,
    //             canActivate: [CustomerCanActivateService],
    //             canDeactivate: [CanDeactivateService],
    //         },
    //     ]
    // },
    // {
    //     path: COMMON_CUSTOMER_PROFILE_URL,
    //     component: CustomerProfileComponent,
    //     canActivate: [CustomerCanActivateService],
    // },

];
