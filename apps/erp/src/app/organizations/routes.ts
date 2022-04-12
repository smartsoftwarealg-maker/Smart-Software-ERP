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

export const mainRoutes: Routes = [
    {
        path: ORGANIZATIONS_CHART_URL,
        component: OrganizationsComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ORGANIZATIONS_DIVISIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: DivisionsListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: DivisionDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: DepartmentDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ServiceDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: OfficeDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

export const lookupRoutes: Routes = [];
