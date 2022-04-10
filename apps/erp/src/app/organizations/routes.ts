import {ABS_INDEX_URL, CanActivateService} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {OrganizationsComponent, DivisionsListComponent} from '@ss/organizations/ui-organizations';
import {
    ORGANIZATIONS_CHART_URL,
    ORGANIZATIONS_DEPARTMENTS_URL,
    ORGANIZATIONS_SERVICES_URL,
    ORGANIZATIONS_DIVISIONS_URL
} from '../common';

export const mainRoutes: Routes = [
    {
        path: ORGANIZATIONS_CHART_URL,
        component: OrganizationsComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ORGANIZATIONS_DIVISIONS_URL,
        component: DivisionsListComponent,
        canActivate: [CanActivateService]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

export const lookupRoutes: Routes = [];
