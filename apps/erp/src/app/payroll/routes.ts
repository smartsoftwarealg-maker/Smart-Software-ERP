import {
    LOOKUPS_URL,
    PAYROLL_CATEGORIES_URL,
    PAYROLL_DIPLOMAS_URL,
    PAYROLL_EDUCATION_LEVELS_URL,
    PAYROLL_MARITAL_STATUS_URL,
    PAYROLL_POSTS_URL,
    PAYROLL_NATIONALITIES_URL,
    PAYROLL_SERVICES_URL,
    PAYROLL_EMPLOYEES_URL,
    PAYROLL_EMPLOYEE_ACTIVATION_URL,
    PAYROLL_EMPLOYMENT_TYPE_URL,
    PAYROLL_SUSPENSION_REASON_URL,
    PAYROLL_CAREER_URL,
    PAYROLL_DEPARTMENTS_URL,
    PAYROLL_DIVISIONS_URL
} from '../common';
import {
    ABS_INDEX_URL, CanActivateService, CanDeactivateService
} from '@ss/common/api-common';
import { Routes } from '@angular/router';
import { LIST_URL } from '@ss/common/api-common';
import {
    CategoryListComponent,
    CategoryDetailComponent,
    DiplomaListComponent,
    DiplomaDetailComponent,
    EducationLevelDetailComponent,
    EducationLevelListComponent,
    MaritalStatusDetailComponent,
    MaritalStatusListComponent,
    PostDetailComponent,
    PostListComponent,
    ServiceListComponent,
    ServiceDetailComponent
} from '@ss/common/ui-lookup';
import { WilayaListComponent, WilayaDetailComponent } from '@ss/common/ui-lookup';
import { NationalityDetailComponent, NationalityListComponent } from '@ss/common/ui-lookup';
import { EmployeeListComponent, EmployeeDetailComponent } from '@ss/payroll/ui-employee';
import { EmploymentTypeListComponent, EmploymentTypeDetailComponent } from 'libs/common/ui-lookup/src/lib/employment-type.component';
import { SuspensionReasonListComponent, SuspensionReasonDetailComponent } from 'libs/common/ui-lookup/src/lib/suspension-reason.component';
import { DepartmentListComponent, DepartmentDetailComponent } from 'libs/common/ui-lookup/src/lib/department.component';
import { DivisionListComponent, DivisionDetailComponent } from 'libs/common/ui-lookup/src/lib/division.component';

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./payroll-lookups.module').then(m => m.PayrollLookupsModule)
    },
    {
        path: PAYROLL_EMPLOYEES_URL,
        children: [
            {
                path: LIST_URL,
                component: EmployeeListComponent,
                canActivate: [CanActivateService],
                data: { payrollButtons: true }
            },
            {
                path: PAYROLL_EMPLOYEE_ACTIVATION_URL,
                canActivate: [CanActivateService],
                loadChildren: () => import('@ss/payroll/ui-employee-activation').then(m => m.PayrollUiEmployeeActivationModule),
            },
            {
                path: PAYROLL_CAREER_URL,
                canActivate: [CanActivateService],
                loadChildren: () => import('@ss/payroll/ui-employee-career').then(m => m.PayrollUiEmployeeCareerModule),
            },
            {
                path: ':id',
                component: EmployeeDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

export const lookupRoutes: Routes = [
    {
        path: PAYROLL_EMPLOYMENT_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: EmploymentTypeListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: EmploymentTypeDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAYROLL_SUSPENSION_REASON_URL,
        children: [
            {
                path: LIST_URL,
                component: SuspensionReasonListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: SuspensionReasonDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAYROLL_SERVICES_URL,
        children: [
            {
                path: LIST_URL,
                component: ServiceListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ServiceDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAYROLL_CATEGORIES_URL,
        children: [
            {
                path: LIST_URL,
                component: CategoryListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CategoryDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAYROLL_DIPLOMAS_URL,
        children: [
            {
                path: LIST_URL,
                component: DiplomaListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: DiplomaDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAYROLL_EDUCATION_LEVELS_URL,
        children: [
            {
                path: LIST_URL,
                component: EducationLevelListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: EducationLevelDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAYROLL_MARITAL_STATUS_URL,
        children: [
            {
                path: LIST_URL,
                component: MaritalStatusListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: MaritalStatusDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAYROLL_POSTS_URL,
        children: [
            {
                path: LIST_URL,
                component: PostListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: PostDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAYROLL_NATIONALITIES_URL,
        children: [
            {
                path: LIST_URL,
                component: NationalityListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: NationalityDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAYROLL_DEPARTMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: DepartmentListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: DepartmentDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: PAYROLL_DIVISIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: DivisionListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: DivisionDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
