import {administrationNavTree} from '../app/administration/side-nav-tree';
import {scheduledSalesNavTree} from '../app/scheduled-sales/side-nav-tree';
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
import { crmNavTree } from '../app/crm/side-nav-tree';

export const environment = {
    production: true,
};

export const navBar = [
    administrationNavTree,
    scheduledSalesNavTree,
    crmNavTree,
    dashboardNavTree
];

export const langAssets = [
    ['assets/locale/', ''],
    ['assets/locale/administration_', 'ADMINISTRATION_'],
    ['assets/locale/sch_', 'SCH_'],
    ['assets/locale/logistics_', 'LOGISTICS_'],
    ['assets/locale/bl_', 'BL_'],
    ['assets/locale/crm_', 'CRM_'],
    ['assets/locale/common_', 'COMMON_'],
];

export const appRoutes: Routes =  [
    {
        path: INDEX_PAGE_URL,
        component: MainPageComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () => import('../app/organizations/routes').then(m => m.orgRoutes)
    },
    {
        path: SCHEDULED_SALES_APP_URL,
        loadChildren: () => import('../app/scheduled-sales/routes').then(m => m.scheduledSalesRoutes)
    },
    {
        path: ADMINISTRATION_APP_URL,
        loadChildren: () => import('../app/administration/routes').then(m => m.administrationRoutes)
    },
    {
        path: DASHBOARD_APP_URL,
        loadChildren: () => import('../app/dashboard/routes').then(m => m.dashboardRoutes)
    },
    {
        path: CRM_APP_URL,
        loadChildren: () => import('../app/crm/routes').then(m => m.crmRoutes)
    },
    {
        path: LOGISTICS_APP_URL,
        loadChildren: () => import('../app/logistics-admin/routes').then(m => m.logisticsAdminRoutes)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ADMINISTRATION', 'DASHBOARD-APP',  'ORGANIZATION', 'PAYMENTS',
    'PURCHASES', 'SALES', 'WEBARCHIVE', 'WORKFLOW', 'SCHEDULED_SALES'];
