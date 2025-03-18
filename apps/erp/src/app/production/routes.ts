import {Routes} from '@angular/router';
import { ABS_INDEX_URL } from '@ss/common/api-common';

export const prodRoutes: Routes = [

    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
