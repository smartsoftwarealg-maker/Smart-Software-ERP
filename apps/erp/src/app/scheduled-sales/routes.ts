import {
    ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL,
} from '@ss/common/api-common';
import {Routes} from '@angular/router';
import {SS_PROJECTS_URL} from '../common';
import {ProjectListComponent, ProjectDetailComponent} from '@ss/scheduled-sales/projects';

export const schedSalesRoutes: Routes = [
    {
        path: SS_PROJECTS_URL,
        children: [
            {
                path: LIST_URL,
                component: ProjectListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ProjectDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
