import {LOOKUPS_URL, PAY_ELEMENT_TYPES_URL, ARCHIVE_URL, TAG_URL, ARCHIVE_VIEWER} from '../common';
import { Routes } from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {
    ArchiveListComponent,
    ArchiveDetailComponent,
    TagListComponent,
    TagDetailComponent,
    ArchiveViewerComponent
} from '@ss/web-arch/ui';
import {loginGuard} from '../erp-guards';

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./web-arch-lookups.module').then(m => m.WebArchLookupsModule)
    },
    {
        path: ARCHIVE_URL,
        children: [
            {
                path: ARCHIVE_VIEWER,
                component: ArchiveViewerComponent
            },
            {
                path: LIST_URL,
                component: ArchiveListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ArchiveDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: TAG_URL,
        children: [
            {
                path: LIST_URL,
                component: TagListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: TagDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];

export const lookupRoutes: Routes = [

    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
