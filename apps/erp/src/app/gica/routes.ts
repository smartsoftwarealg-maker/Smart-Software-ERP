import { CanActivateFn, Routes } from '@angular/router';

import {
    ABS_INDEX_URL, LIST_URL,
} from '@ss/common/api-common';
import {
    GICA_CONSTANTS_URL,
    GICA_WEIGHTS_URL,
    GICA_SCALE_URL,
    GICA_REPORTS_URL,
    GICA_HISTORY_URL,
    GICA_GRADING_URL,
    GICA_CRITERIA_URL,
    COMMON_REPORTS_URL,
    GICA_EVOLUTIONS_URL, GICA_CAREER_MOTIVE_URL
} from '../common';

import {loginGuard} from '../erp-guards';
import {
    ApplicationComponent,
    ScaleDetailComponent,
    ApplicationArchiveComponent,
    CriterionService,
    ScaleListComponent,
    GradingsComponent,
    CriteriaListComponent,
    CriteriaDetailComponent,
    AbsenceWeightListComponent,
    AbsenceWeightDetailComponent,
    EvolutionReportComponent, CareerMotiveListComponent
} from '@gica/career-evolution';
import { inject } from '@angular/core';
import {
    ConstantDetailComponent
} from '@gica/career-evolution';
import { ReportViewComponent } from '@ss/common/ui-report-param';


// export const faultGuard: CanActivateFn = () => inject(FaultService).canActivate();
export const criteriaGuard: CanActivateFn = () => inject(CriterionService).canActivate();

export const gicaRoutes: Routes = [
    {
        path: GICA_EVOLUTIONS_URL, component: EvolutionReportComponent, canActivate: [loginGuard]
    },
    {
        path: GICA_CAREER_MOTIVE_URL, component: CareerMotiveListComponent, canActivate: [loginGuard]
    },
    {
        path: GICA_CONSTANTS_URL, component: ConstantDetailComponent, canActivate: [loginGuard]
    },
    {
        path: GICA_GRADING_URL, component: GradingsComponent, canActivate: [loginGuard], data: { gradingMode: true }
    },
    // {
    //     path: GICA_DEGRADING_URL, component: GradingsComponent, canActivate: [loginGuard], data: { gradingMode: false }
    // },
    {
        path: GICA_REPORTS_URL, component: ApplicationComponent, canActivate: [loginGuard]
    },
    {
        path: GICA_HISTORY_URL, component: ApplicationArchiveComponent, canActivate: [loginGuard]
    },
    {
        path: GICA_WEIGHTS_URL,
        children: [
            { path: LIST_URL, component: AbsenceWeightListComponent, canActivate: [loginGuard]},
            { path: ':id', component: AbsenceWeightDetailComponent, canActivate: [loginGuard] }
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
        path: COMMON_REPORTS_URL,
        component: ReportViewComponent,
        canActivate: [loginGuard],
        data: { reportBase: 'gica' }
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
