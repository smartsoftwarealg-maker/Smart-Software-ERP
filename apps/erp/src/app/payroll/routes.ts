import {
    LOOKUPS_URL
} from '../common';
import {
    ABS_INDEX_URL, CanActivateService, CanDeactivateService
} from '@ss/common/api-common';
import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./payroll-lookups.module').then(m => m.PayrollLookupsModule)
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];

export const lookupRoutes: Routes = [];
