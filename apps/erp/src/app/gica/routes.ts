import { CanActivateFn, Routes } from '@angular/router';

import {
    ABS_INDEX_URL, LIST_URL,
} from '@ss/common/api-common';
import {
    GICA_CONSTANTS_URL,
    GICA_MOTIVES_URL,
    GICA_FAULTS_URL,
    GICA_SCALE_URL,
    GICA_REPORTS_URL,
    GICA_HISTORY_URL,
    GICA_GRADING_URL,
    GICA_CRITERIA_URL, GICA_DEGRADING_URL
} from '../common';

import {loginGuard} from '../erp-guards';
import {
    ConstantDetailComponent,
    FaultDetailComponent,
    FaultListComponent,
    FaultMotiveDetailComponent,
    FaultMotiveListComponent,
    FaultService,
    ApplicationComponent,
    ScaleDetailComponent,
    ScaleListComponent, GradingsComponent, CriteriaListComponent, CriteriaDetailComponent
} from 'gica/fault-list';
import { inject } from '@angular/core';
import {
    ApplicationArchiveComponent,
    CriterionService
} from 'gica/fault-list';


export const faultGuard: CanActivateFn = () => inject(FaultService).canActivate();
export const criteriaGuard: CanActivateFn = () => inject(CriterionService).canActivate();

export const gicaRoutes: Routes = [
    {
        path: GICA_CONSTANTS_URL, component: ConstantDetailComponent, canActivate: [loginGuard]
    },
    {
        path: GICA_GRADING_URL, component: GradingsComponent, canActivate: [loginGuard], data: { gradingMode: true }
    },
    {
        path: GICA_DEGRADING_URL, component: GradingsComponent, canActivate: [loginGuard], data: { gradingMode: false }
    },
    {
        path: GICA_REPORTS_URL, component: ApplicationComponent, canActivate: [loginGuard]
    },
    {
        path: GICA_HISTORY_URL, component: ApplicationArchiveComponent, canActivate: [loginGuard]
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
        path: GICA_CRITERIA_URL,
        children: [
            { path: LIST_URL, component: CriteriaListComponent, canActivate: [loginGuard]},
            { path: ':id', component: CriteriaDetailComponent, canActivate: [loginGuard, criteriaGuard] }
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
