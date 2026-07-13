import {administrationNavTree} from '../app/administration/side-nav-tree';
import {financeNavTree} from '../app/finance/side-nav-tree';
import {dashboardNavTree} from '../app/dashboard/side-nav-tree';
import {contractsNavTree} from '../app/contracts/side-nav-tree';
import {Routes} from '@angular/router';
import {INDEX_PAGE_URL} from '@ss/common/api-common';
import {CanActivateService} from '@ss/common/api-common';
import {MainPageComponent} from '@ss/common/ui-main-page';
import {
    ADMINISTRATION_APP_URL,
    DASHBOARD_APP_URL,
    FINANCE_APP_URL,
    LOGISTICS_APP_URL,
    SALES_APP_URL,
    STOCK_APP_URL,
    CONTRACTS_APP_URL,
    WORK_FLOW_APP_URL,
    PURCHASES_APP_URL,
} from '../app/common';
import {logisticsAdminNavTree} from '../app/logistics-admin/side-nav-tree';
import {workflowNavTree} from '../app/workflow/side-nav-tree';
import { stockNavTree } from '../app/stock/side-nav-tree';
import { purchasesNavTree } from '../app/purchases/side-nav-tree';
import { salesNavTree } from '../app/sales/side-nav-tree';

export const environment = {
    production: true,
    multiCompany: false,
    company: <string>null,
    homePage: <string>null,
};

export const navBar = [
    administrationNavTree,
    logisticsAdminNavTree,
    purchasesNavTree,
    stockNavTree,
    contractsNavTree,
    salesNavTree,
    financeNavTree,
    dashboardNavTree,
    workflowNavTree,
];

export const langAssets = [
    ['assets/locale/', ''],
    ['assets/locale/administration_', 'ADMINISTRATION_'],
    ['assets/locale/payroll_',        'PAYROLL_'],
    ['assets/locale/stock_',          'STOCK_'],
    ['assets/locale/common_',         'COMMON_'],
    ['assets/locale/social_',         'SOCIAL_'],
    ['assets/locale/logistics_',      'LOGISTICS_'],
    ['assets/locale/purchases_',      'PURCHASES_'],
    ['assets/locale/sales_',          'SALES_'],
    ['assets/locale/bl_',             'BL_'],
    ['assets/locale/remuneration_',   'REMUN_'],
    ['assets/locale/accounting_',     'ACC_'],
    ['assets/locale/webarch_',        'WAR_'],
    ['assets/locale/assets_',         'ASSET_'],
    ['assets/locale/treasury_',       'TRS_'],
    ['assets/locale/sch_',            'SCH_'],
];

export const appRoutes: Routes =  [
    {
        path: INDEX_PAGE_URL,
        component: MainPageComponent,
        canActivate: [CanActivateService]
    },
    {
        path: LOGISTICS_APP_URL,
        loadChildren: () => import('../app/logistics-admin/routes').then(m => m.logisticsAdminRoutes)
    },
    {
        path: WORK_FLOW_APP_URL,
        loadChildren: () => import('../app/workflow/routes').then(m => m.workflowRoutes)
    },
    {
        path: STOCK_APP_URL,
        loadChildren: () => import('../app/stock/routes').then(m => m.stockRoutes)
    },
    {
        path: SALES_APP_URL,
        loadChildren: () => import('../app/sales/routes').then(m => m.salesRoutes)
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
        path: FINANCE_APP_URL,
        loadChildren: () => import('../app/finance/routes').then(m => m.financeRoutes)
    },
    {
        path: PURCHASES_APP_URL,
        loadChildren: () => import('../app/purchases/routes').then(m => m.purchasesRoutes)
    },
    {
        path: LOGISTICS_APP_URL,
        loadChildren: () => import('../app/logistics-admin/routes').then(m => m.logisticsAdminRoutes)
    },
    {
        path: CONTRACTS_APP_URL,
        loadChildren: () => import('../app/contracts/routes').then(m => m.contractRoutes)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ACCOUNTING_APP',
    'ADMINISTRATION',
    'ASSETS',
    'DASHBOARD-APP',
    'FINANCE',
    'HRMASTER',
    'STOCK',
    'LOGISTICS',
    'LOGISTICS-ADMINISTRATION',
    'ORGANIZATION',
    'PAYMENTS',
    'PAYROLL',
    'PURCHASES',
    'TREASURY',
    'WORKFLOW',
    'PROJECTS'
];
