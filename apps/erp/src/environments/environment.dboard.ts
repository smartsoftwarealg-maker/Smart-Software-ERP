import {administrationNavTree} from '../app/administration/side-nav-tree';
import {Routes} from '@angular/router';
import {CanActivateService, INDEX_PAGE_URL} from '../../../../libs/common/api-common/src';
import {MainPageComponent} from '../../../../libs/common/ui-main-page/src';
import {
    ADMINISTRATION_APP_URL, CRM_APP_URL,
    DASHBOARD_APP_URL, LOGISTICS_APP_URL,
    ORGANIZATIONS_APP_URL,
    SCHEDULED_SALES_APP_URL
} from '../app/common';
import {dashboardNavTree} from '../app/dashboard/side-nav-tree';

export const environment = {
    production: true,
};

export const navBar = [
    administrationNavTree,
    dashboardNavTree
];

export const langAssets = [
    ['assets/locale/', ''],
    ['assets/locale/administration_', 'ADMINISTRATION_'],
    ['assets/locale/bl_', 'BL_'],
    ['assets/locale/common_', 'COMMON_'],
];

export const appRoutes: Routes =  [
    {
        path: INDEX_PAGE_URL,
        component: MainPageComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ADMINISTRATION_APP_URL,
        loadChildren: () => import('../app/administration/administration.module').then(m => m.AdministrationModule)
    },
    {
        path: DASHBOARD_APP_URL,
        loadChildren: () => import('../app/dashboard/app-dashboard.module').then(m => m.AppDashboardModule)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ADMINISTRATION', 'DASHBOARD-APP',  'ORGANIZATION', 'PAYMENTS',
    'PURCHASES', 'SALES', 'WEBARCHIVE', 'WORKFLOW', 'SCHEDULED_SALES'];
