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
        loadChildren: () => import('../app/logistics-admin/logistics-admin.module').then(m => m.LogisticsAdminModule)
    },
    {
        path: WORK_FLOW_APP_URL,
        loadChildren: () => import('../app/workflow/workflow.module').then(m => m.WorkflowModule)
    },
    {
        path: STOCK_APP_URL,
        loadChildren: () => import('../app/stock/stock.module').then(m => m.StockModule)
    },
    {
        path: SALES_APP_URL,
        loadChildren: () => import('../app/sales/sales.module').then(m => m.SalesModule)
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
        path: FINANCE_APP_URL,
        loadChildren: () => import('../app/finance/finance.module').then(m => m.FinanceModule)
    },
    {
        path: PURCHASES_APP_URL,
        loadChildren: () => import('../app/purchases/purchases.module').then(m => m.PurchasesModule)
    },
    {
        path: LOGISTICS_APP_URL,
        loadChildren: () => import('../app/logistics-admin/logistics-admin.module').then(m => m.LogisticsAdminModule)
    },
    {
        path: CONTRACTS_APP_URL,
        loadChildren: () => import('../app/contracts/contracts.module').then(m => m.ContractsModule)
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
