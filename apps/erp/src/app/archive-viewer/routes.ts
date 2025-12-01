import { Routes } from '@angular/router';

import { ABS_INDEX_URL } from '@ss/common/api-common';
import {
    AppArchiveDetailComponent,
    AppArchiveListComponent,
    AppArchiveRightsComponent,
    AppArchiveViewerComponent, AppGenericArchiveComponent,
} from '@ss/common/app-archive';
import { AA_GENERIC, AA_RIGHTS, AA_VIEWER } from '../common';

export const viewerRoutes: Routes = [
    {
        path: AA_GENERIC,
        component:AppGenericArchiveComponent,
        children: [
            {path: '', component: AppArchiveListComponent, pathMatch: 'full'},
            {path: ':id', component: AppArchiveDetailComponent}
        ]
    },
    { path: AA_VIEWER, component: AppArchiveViewerComponent },
    { path: AA_RIGHTS, component: AppArchiveRightsComponent },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL },
];
