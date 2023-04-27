import {
    EMPSPACE_HOLIDAY_REQUEST_URL
} from '../common';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Routes} from '@angular/router';
import {
    CanActivateService,
    CanDeactivateService,
    LIST_URL
} from '@ss/common/api-common';
import {HolidayRequestDetailComponent, HolidayRequestListComponent} from '@ss/attendance';
import {inject} from '@angular/core';

export const loginGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(CanActivateService).canActivate(route, state)

export const empRoutes: Routes = [
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
    {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
];
