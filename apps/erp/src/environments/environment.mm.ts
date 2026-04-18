import {administrationNavTree} from '../app/administration/side-nav-tree';
import {organizationsNavTree} from '../app/organizations/side-nav-tree';
import {logisticsAdminNavTree} from '../app/logistics-admin/side-nav-tree';
import {Routes} from '@angular/router';
import {INDEX_PAGE_URL} from '@ss/common/api-common';
import {
    ADMINISTRATION_APP_URL,
    DASHBOARD_APP_URL,
    LOGISTICS_APP_URL,
    ORGANIZATIONS_APP_URL,
    CMMS_APP_URL,
    PRODUCTION_APP_URL
} from '../app/common';
import { cmmsNavTree } from '../app/cmms/side-nav-tree';
import { productionNavTree } from '../app/production/side-nav-tree';

export const environment = {
    production: true,
    multiCompany: false,
    company: null,
};

export const navBar = [
    administrationNavTree,
    organizationsNavTree,
    logisticsAdminNavTree,
    cmmsNavTree,
    productionNavTree
];

export const langAssets = [
    ['assets/locale/', ''],
    ['assets/locale/administration_', 'ADMINISTRATION_'],
    ['assets/locale/stock_', 'STOCK_'],
    ['assets/locale/common_', 'COMMON_'],
    ['assets/locale/logistics_', 'LOGISTICS_'],
    ['assets/locale/bl_', 'BL_'],
    ['assets/locale/cmms_', 'CMMS_'],
    ['assets/locale/production_', 'PROD_'],
];

export const appRoutes: Routes =  [
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () => import('../app/organizations/organizations.module').then(m => m.OrganizationsModule)
    },
    {
        path: CMMS_APP_URL,
        loadChildren: () => import('../app/cmms/cmms.module').then(m => m.CmmsModule)
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
        path: LOGISTICS_APP_URL,
        loadChildren: () => import('../app/logistics-admin/logistics-admin.module').then(m => m.LogisticsAdminModule)
    },
    {
        path: PRODUCTION_APP_URL,
        loadChildren: () => import('../app/production/production.module').then(m => m.ProductionModule)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ACCOUNTING', 'ADMINISTRATION', 'ASSETS', 'DASHBOARD-APP', 'FINANCE', 'HRMASTER',
    'STOCK', 'LOGISTICS', 'LOGISTICS-ADMINISTRATION', 'ORGANIZATION', 'PAYMENTS',
    'PAYROLL', 'ATTENDANCE', 'PURCHASES', 'SALES', 'WEBARCHIVE', 'TREASURY', 'LTM',
    'WORKFLOW', 'SCHEDULED_SALES', 'GICACARRER'];
