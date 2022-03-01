import {
    LOOKUPS_URL,
    HR_CATEGORIES_URL,
    HR_DIPLOMAS_URL,
    HR_EDUCATION_LEVELS_URL,
    HR_MARITAL_STATUS_URL,
    HR_POSTS_URL,
    HR_NATIONALITIES_URL,
    HR_SERVICES_URL,
    HR_EMPLOYEES_URL,
    HR_EMPLOYEE_ACTIVATION_URL,
    HR_EMPLOYMENT_TYPE_URL,
    HR_SUSPENSION_REASON_URL,
    HR_CAREER_URL,
    HR_CONTRACTS_URL,
    HR_WIVES_URL,
    HR_DEPARTMENTS_URL,
    HR_DIVISIONS_URL
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
    ServiceDetailComponent,
    EmploymentTypeListComponent,
    EmploymentTypeDetailComponent,
    SuspensionReasonListComponent,
    SuspensionReasonDetailComponent, DepartmentListComponent, DepartmentDetailComponent,
    DivisionDetailComponent,
    DivisionListComponent
} from '@ss/common/ui-lookup';
import { NationalityDetailComponent, NationalityListComponent } from '@ss/common/ui-lookup';
import { EmployeeListComponent, EmployeeDetailComponent } from '@ss/payroll/ui-employee';

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./hr-lookups.module').then(m => m.HRLookupsModule)
    },
    {
        path: HR_EMPLOYEES_URL,
        children: [
            {
                path: LIST_URL,
                component: EmployeeListComponent,
                canActivate: [CanActivateService],
                data: { payrollButtons: true }
            },
            {
                path: HR_EMPLOYEE_ACTIVATION_URL,
                canActivate: [CanActivateService],
                loadChildren: () => import('@ss/payroll/ui-employee-activation').then(m => m.PayrollUiEmployeeActivationModule),
            },
            {
                path: HR_CAREER_URL,
                canActivate: [CanActivateService],
                loadChildren: () => import('@ss/payroll/ui-employee-career').then(m => m.PayrollUiEmployeeCareerModule),
            },
            {
                path: HR_CONTRACTS_URL,
                canActivate: [CanActivateService],
                loadChildren: () => import('@ss/payroll/ui-employee-contract').then(m => m.PayrollUiEmployeeContractModule),
            },
            {
                path: HR_WIVES_URL,
                canActivate: [CanActivateService],
                loadChildren: () => import('@ss/payroll/ui-employee-wives').then(m => m.PayrollUiEmployeeWivesModule),
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
        path: HR_EMPLOYMENT_TYPE_URL,
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
        path: HR_SUSPENSION_REASON_URL,
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
        path: HR_SERVICES_URL,
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
        path: HR_CATEGORIES_URL,
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
        path: HR_DIPLOMAS_URL,
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
        path: HR_EDUCATION_LEVELS_URL,
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
        path: HR_MARITAL_STATUS_URL,
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
        path: HR_POSTS_URL,
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
        path: HR_NATIONALITIES_URL,
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
        path: HR_DEPARTMENTS_URL,
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
        path: HR_DIVISIONS_URL,
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
