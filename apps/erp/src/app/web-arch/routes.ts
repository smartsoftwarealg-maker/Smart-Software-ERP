import { LOOKUPS_URL } from '../common';
import { Routes } from '@angular/router';
import { ABS_INDEX_URL } from '@ss/common/api-common';

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./web-arch-lookups.module').then(m => m.WebArchLookupsModule)
    },
];

export const lookupRoutes: Routes = [
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
