import {administrationNavTree} from '../app/administration/side-nav-tree';
import {Routes} from '@angular/router';
import {CanActivateService, INDEX_PAGE_URL} from '../../../../libs/common/api-common/src';
import {MainPageComponent} from '../../../../libs/common/ui-main-page/src';
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
    ['assets/locale/sch_', 'SCH_'],
    ['assets/locale/ltm_', 'LTM_'],
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
        path: LTM_APP_URL,
        loadChildren: () => import('../app/ltm/l-t-m.module').then(m => m.LTMModule)
    },
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () => import('../app/organizations/organizations.module').then(m => m.OrganizationsModule)
    },
    // {
    //     path: SCHEDULED_SALES_APP_URL,
    //     loadChildren: () => import('../app/scheduled-sales/scheduled-sales.module').then(m => m.ScheduledSalesModule)
    // },
    {
        path: ADMINISTRATION_APP_URL,
        loadChildren: () => import('../app/administration/administration.module').then(m => m.AdministrationModule)
    },
    {
        path: DASHBOARD_APP_URL,
        loadChildren: () => import('../app/dashboard/app-dashboard.module').then(m => m.AppDashboardModule)
    },
    // {
    //     path: FINANCE_APP_URL,
    //     loadChildren: () => import('../app/finance/finance.module').then(m => m.FinanceModule)
    // },
    // {
    //     path: LOGISTICS_APP_URL,
    //     loadChildren: () => import('../app/logistics-admin/logistics-admin.module').then(m => m.LogisticsAdminModule)
    // },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ADMINISTRATION', 'DASHBOARD-APP',  'ORGANIZATION', 'LTM', 'WORKFLOW'];
