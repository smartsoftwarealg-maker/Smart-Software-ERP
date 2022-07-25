import {
    ABS_INDEX_URL,
} from '@ss/common/api-common';
import {Routes} from '@angular/router';

export const salesRoutes: Routes = [
];

export const lookupRoutes: Routes = [
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
