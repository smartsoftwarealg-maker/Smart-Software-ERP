import {administrationNavTree} from '../app/administration/side-nav-tree';
import {organizationsNavTree} from '../app/organizations/side-nav-tree';
import {assetsNavTree} from '../app/assets-app/side-nav-tree';
import {Routes} from '@angular/router';
import {CanActivateService, INDEX_PAGE_URL} from '../../../../libs/common/api-common/src';
import {MainPageComponent} from '../../../../libs/common/ui-main-page/src';
import {
    ADMINISTRATION_APP_URL,
    ASSETS_APP_URL,
    DASHBOARD_APP_URL,
    ORGANIZATIONS_APP_URL,
} from '../app/common';
import {dashboardNavTree} from '../app/dashboard/side-nav-tree';

export const environment = {
    production: true,
};

export const navBar = [
    administrationNavTree,
    organizationsNavTree,
    dashboardNavTree,
    assetsNavTree,
];

export const langAssets = [
    ['assets/locale/', ''],
    ['assets/locale/administration_', 'ADMINISTRATION_'],
    ['assets/locale/common_', 'COMMON_'],
    ['assets/locale/logistics_', 'LOGISTICS_'],
    ['assets/locale/purchases_', 'PURCHASES_'],
    ['assets/locale/bl_', 'BL_'],
    ['assets/locale/assets_', 'ASSET_'],
    ['assets/locale/accounting_', 'ACC_'],
];

export const appRoutes: Routes =  [
    {
        path: INDEX_PAGE_URL,
        component: MainPageComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () => import('../app/organizations/organizations.module').then(m => m.OrganizationsModule)
    },
    {
        path: ADMINISTRATION_APP_URL,
        loadChildren: () => import('../app/administration/administration.module').then(m => m.AdministrationModule)
    },
    {
        path: DASHBOARD_APP_URL,
        loadChildren: () => import('../app/dashboard/app-dashboard.module').then(m => m.AppDashboardModule)
    },
    {
        path: DASHBOARD_APP_URL,
        loadChildren: () => import('../app/dashboard/app-dashboard.module').then(m => m.AppDashboardModule)
    },
    {
        path: ASSETS_APP_URL,
        loadChildren: () => import('../app/assets-app/assets.module').then(m => m.AssetsModule)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];
