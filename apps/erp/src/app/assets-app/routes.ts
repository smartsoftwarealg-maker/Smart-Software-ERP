import { ABS_INDEX_URL, CanActivateService, LIST_URL, CanDeactivateService } from '@ss/common/api-common';
import { Routes } from '@angular/router';
import {ASSETS_ASSET_URL} from '../common';
import {AssetsDetailComponent, AssetsListComponent} from '@ss/assets-component';

export const mainRoutes: Routes = [
    {
        path: ASSETS_ASSET_URL,
        children: [
            {
                path: LIST_URL,
                component: AssetsListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AssetsDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
