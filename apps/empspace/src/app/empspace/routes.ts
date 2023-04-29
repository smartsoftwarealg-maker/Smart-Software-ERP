import {
    EMPSPACE_HOLIDAY_REQUEST_URL, EMPSPACE_PAYSLIP_URL, EMPSPACE_PROFILE_URL, EMPSPACE_REPOERT_URL
} from "../common";
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Routes} from '@angular/router';
import {
    CanActivateService,
    CanDeactivateService, LIST_URL
} from '@ss/common/api-common';
import {HolidayRequestDetailComponent, HolidayRequestListComponent} from '@ss/attendance';
import {inject} from '@angular/core';
import { EmployeeProfileComponent } from '@ss/common/ui-login';
import { ReportViewComponent } from '@ss/common/ui-report-param';
import { PersonalPaySlipComponent } from "@ss/remuneration/employee-space";

export const loginGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(CanActivateService).canActivate(route, state);

export const empRoutes: Routes = [
    {
        path: EMPSPACE_PROFILE_URL,
        component: EmployeeProfileComponent,
        canActivate: [CanActivateService],
    },
    {
        path: EMPSPACE_PAYSLIP_URL,
        component: PersonalPaySlipComponent,
        canActivate: [CanActivateService],
    },
    {
        path: EMPSPACE_HOLIDAY_REQUEST_URL,
        children: [
            {
                path: LIST_URL,
                component: HolidayRequestListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: HolidayRequestDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: EMPSPACE_REPOERT_URL,
        component: ReportViewComponent,
        canActivate: [loginGuard],
        data: { reportBase: 'espace' }
    },
    {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
];
