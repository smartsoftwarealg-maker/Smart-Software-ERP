import {
    LOOKUPS_URL,
    PAYROLL_CATEGORIES_URL,
    PAYROLL_DIPLOMAS_URL,
    PAYROLL_EDUCATION_LEVELS_URL,
    PAYROLL_MARITAL_STATUS_URL,
    PAYROLL_POSTS_URL,
    COMMON_WILAYAS_URL,
    PAYROLL_NATIONALITIES_URL,
    PAYROLL_SERVICES_URL,
    PAYROLL_PERSONS_URL,
    PAYROLL_PERSONS_ACTIVATION
} from '../constants';
import {
    ABS_INDEX_URL, CanActivateService
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
import { PersonListComponent, PersonDetailComponent } from '@ss/payroll/ui-person';

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./payroll-lookups.module').then(m => m.PayrollLookupsModule)
    },
    {
        path: PAYROLL_PERSONS_URL,
        children: [
            {
                path: LIST_URL,
                component: PersonListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: PAYROLL_PERSONS_ACTIVATION,
                canActivate: [CanActivateService],
                loadChildren: () => import('@ss/payroll/ui-person').then(m => m.EmployeeActivationModule),
            },
            {
                path: ':id',
                component: PersonDetailComponent,
                canActivate: [CanActivateService]
            },
            { path: '**', redirectTo: LIST_URL }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

export const lookupRoutes: Routes = [
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
                canActivate: [CanActivateService]
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
                canActivate: [CanActivateService]
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
                canActivate: [CanActivateService]
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
                canActivate: [CanActivateService]
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
                canActivate: [CanActivateService]
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
                canActivate: [CanActivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: COMMON_WILAYAS_URL,
        children: [
            {
                path: LIST_URL,
                component: WilayaListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: WilayaDetailComponent,
                canActivate: [CanActivateService]
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
                canActivate: [CanActivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
