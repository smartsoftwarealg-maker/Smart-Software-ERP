import {LOOKUPS_URL, PAY_ELEMENT_TYPES_URL, ARCHIVE_URL, TAG_URL} from '../common';
import { Routes } from '@angular/router';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {ArchiveListComponent, ArchiveDetailComponent} from '@ss/web-arch/ui';
import {TagListComponent} from '../../../../../libs/web-arch/ui/src/lib/tags/tag-list/tag-list.component';
import {TagDetailComponent} from '../../../../../libs/web-arch/ui/src/lib/tags/tag-detail/tag-detail.component';

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./web-arch-lookups.module').then(m => m.WebArchLookupsModule)
    },
    {
        path: ARCHIVE_URL,
        children: [
            {
                path: LIST_URL,
                component: ArchiveListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ArchiveDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: TagDetailComponent,
                canActivate: [CanActivateService],
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
