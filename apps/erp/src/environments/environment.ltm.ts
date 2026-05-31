import {administrationNavTree} from '../app/administration/side-nav-tree';
import {Routes} from '@angular/router';
import {CanActivateService, INDEX_PAGE_URL} from '@ss/common/api-common';
import {MainPageComponent} from '@ss/common/ui-main-page';
import {ltmNavTree} from '../app/ltm/side-nav-tree';
import {
    ADMINISTRATION_APP_URL,
    DASHBOARD_APP_URL,
    LTM_APP_URL,
    ORGANIZATIONS_APP_URL,
} from '../app/common';
import {dashboardNavTree} from '../app/dashboard/side-nav-tree';

export const environment = {
    production: true,
};

export const navBar = [
    administrationNavTree,
    dashboardNavTree,
    ltmNavTree,
];

export const langAssets = [
    ['assets/locale/', ''],
    ['assets/locale/administration_', 'ADMINISTRATION_'],
    ['assets/locale/logistics_',      'LOGISTICS_'],
    ['assets/locale/ltm_',            'LTM_'],
    ['assets/locale/bl_',             'BL_'],
    ['assets/locale/common_',         'COMMON_'],
];

export const appRoutes: Routes =  [
    {
        path: INDEX_PAGE_URL,
        component: MainPageComponent,
        canActivate: [CanActivateService]
    },
    {
        path: LTM_APP_URL,
        loadChildren: () => import('../app/ltm/routes').then(m => m.ltmRoutes)
    },
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () => import('../app/organizations/routes').then(m => m.orgRoutes)
    },
    // {
    //     path: SCHEDULED_SALES_APP_URL,
    //     loadChildren: () => import('../app/scheduled-sales/routes').then(m => m.scheduledSalesRoutes)
    // },
    {
        path: ADMINISTRATION_APP_URL,
        loadChildren: () => import('../app/administration/routes').then(m => m.administrationRoutes)
    },
    {
        path: DASHBOARD_APP_URL,
        loadChildren: () => import('../app/dashboard/routes').then(m => m.dashboardRoutes)
    },
    // {
    //     path: FINANCE_APP_URL,
    //     loadChildren: () => import('../app/finance/routes').then(m => m.financeRoutes)
    // },
    // {
    //     path: LOGISTICS_APP_URL,
    //     loadChildren: () => import('../app/logistics-admin/routes').then(m => m.logisticsAdminRoutes)
    // },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ADMINISTRATION', 'DASHBOARD-APP',  'ORGANIZATION', 'LTM', 'WORKFLOW'];

