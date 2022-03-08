import { ABS_INDEX_URL, CanActivateService, LIST_URL, CanDeactivateService } from '@ss/common/api-common';
import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
