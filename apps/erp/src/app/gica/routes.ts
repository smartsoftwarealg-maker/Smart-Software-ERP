import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Routes } from "@angular/router";

import {
    ABS_INDEX_URL, LIST_URL,
} from '@ss/common/api-common';
import {
    GICA_CONSTANTS_URL,
    GICA_MOTIVES_URL,
    GICA_FAULTS_URL,
    GICA_SCALE_URL
} from '../common';

import {loginGuard} from '../erp-guards';
import {
    ConstantDetailComponent,
    FaultDetailComponent,
    FaultListComponent,
    FaultMotiveDetailComponent,
    FaultMotiveListComponent,
    FaultService,
    ScaleDetailComponent,
    ScaleListComponent
} from 'gica/fault-list';
import { inject } from '@angular/core';


export const faultGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(FaultService).canActivate();

export const ltmRoutes: Routes = [
    {
        path: GICA_CONSTANTS_URL, component: ConstantDetailComponent, canActivate: [loginGuard]
    },
    {
        path: GICA_MOTIVES_URL,
        children: [
            { path: LIST_URL, component: FaultMotiveListComponent, canActivate: [loginGuard]},
            { path: ':id', component: FaultMotiveDetailComponent, canActivate: [loginGuard] }
        ]
    },
    {
        path: GICA_FAULTS_URL,
        children: [
            { path: LIST_URL, component: FaultListComponent, canActivate: [loginGuard]},
            { path: ':id', component: FaultDetailComponent, canActivate: [loginGuard, faultGuard] }
        ]
    },
    {
        path: GICA_SCALE_URL,
        children: [
            { path: LIST_URL, component: ScaleListComponent, canActivate: [loginGuard]},
            { path: ':id', component: ScaleDetailComponent, canActivate: [loginGuard] }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];
