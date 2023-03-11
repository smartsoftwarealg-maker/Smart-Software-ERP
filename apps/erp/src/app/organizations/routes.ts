import {ABS_INDEX_URL, CanActivateService, LIST_URL, CanDeactivateService} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {
    OrganizationsComponent,
    DivisionsListComponent,
    DivisionDetailComponent,
    DepartmentsListComponent,
    DepartmentDetailComponent,
    ServicesListComponent,
    ServiceDetailComponent,
    OfficesListComponent,
    OfficeDetailComponent
} from '@ss/organizations/ui-organizations';
import {
    ORGANIZATIONS_CHART_URL,
    ORGANIZATIONS_DEPARTMENTS_URL,
    ORGANIZATIONS_SERVICES_URL,
    ORGANIZATIONS_DIVISIONS_URL,
    ORGANIZATIONS_OFFICES_URL,
} from '../common';
import {loginGuard} from '../erp-guards';

export const mainRoutes: Routes = [
    {
        path: ORGANIZATIONS_CHART_URL,
        component: OrganizationsComponent,
        canActivate: [loginGuard]
    },
    {
        path: ORGANIZATIONS_DIVISIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: DivisionsListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: DivisionDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ORGANIZATIONS_DEPARTMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: DepartmentsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: DepartmentDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ORGANIZATIONS_SERVICES_URL,
        children: [
            {
                path: LIST_URL,
                component: ServicesListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ServiceDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ORGANIZATIONS_OFFICES_URL,
        children: [
            {
                path: LIST_URL,
                component: OfficesListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: OfficeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

export const lookupRoutes: Routes = [];
