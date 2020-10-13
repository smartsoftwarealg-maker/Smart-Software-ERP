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
    PAYROLL_PERSONS_URL
} from '../constants';
import {
    ABS_INDEX_URL
} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {LIST_URL} from '@ss/common/api-common';
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
} from '@ss/payroll/ui-lookup';
import {DETAIL_URL} from '@ss/common/api-common';
import {WilayaListComponent, WilayaDetailComponent} from '@ss/common/ui-lookup';
import {NationalityDetailComponent, NationalityListComponent} from '@ss/payroll/ui-lookup';
import {PersonListComponent, PersonDetailComponent} from '@ss/payroll/ui-person';

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
                component: PersonListComponent
            },
            {
                path: DETAIL_URL,
                component: PersonDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];

export const lookupRoutes: Routes = [
    {
        path: PAYROLL_SERVICES_URL,
        children: [
            {
                path: LIST_URL,
                component: ServiceListComponent
            },
            {
                path: DETAIL_URL,
                component: ServiceDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: PAYROLL_CATEGORIES_URL,
        children: [
            {
                path: LIST_URL,
                component: CategoryListComponent
            },
            {
                path: DETAIL_URL,
                component: CategoryDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: PAYROLL_DIPLOMAS_URL,
        children: [
            {
                path: LIST_URL,
                component: DiplomaListComponent
            },
            {
                path: DETAIL_URL,
                component: DiplomaDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: PAYROLL_EDUCATION_LEVELS_URL,
        children: [
            {
                path: LIST_URL,
                component: EducationLevelListComponent
            },
            {
                path: DETAIL_URL,
                component: EducationLevelDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: PAYROLL_MARITAL_STATUS_URL,
        children: [
            {
                path: LIST_URL,
                component: MaritalStatusListComponent,
            },
            {
                path: DETAIL_URL,
                component: MaritalStatusDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: PAYROLL_POSTS_URL,
        children: [
            {
                path: LIST_URL,
                component: PostListComponent,
            },
            {
                path: DETAIL_URL,
                component: PostDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: COMMON_WILAYAS_URL,
        children: [
            {
                path: LIST_URL,
                component: WilayaListComponent,
            },
            {
                path: DETAIL_URL,
                component: WilayaDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: PAYROLL_NATIONALITIES_URL,
        children: [
            {
                path: LIST_URL,
                component: NationalityListComponent,
            },
            {
                path: DETAIL_URL,
                component: NationalityDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
