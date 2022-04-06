import {ABS_INDEX_URL, CanActivateService} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {OrganizationsComponent} from '@ss/common/ui-organizations';
import {ORGANIZATIONS_MAIN_URL} from '../common';

export const mainRoutes: Routes = [
    {
        path: ORGANIZATIONS_MAIN_URL,
        component: OrganizationsComponent,
        canActivate: [CanActivateService]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

export const lookupRoutes: Routes = [];
