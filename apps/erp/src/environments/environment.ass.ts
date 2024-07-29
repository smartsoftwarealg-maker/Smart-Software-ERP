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
    SERVICE_SALES, PURCHASES_APP_URL, PAYROLL_APP_URL, HR_APP_URL, ACCOUNTING_APP_URL, TREASURY_APP_URL, SOCIAL_APP_URL
} from '../app/common';
import {logisticsAdminNavTree} from '../app/logistics-admin/side-nav-tree';
import {workflowNavTree} from '../app/workflow/side-nav-tree';
import { ssalesNavTree } from '../app/service-sales/side-nav-tree';
import { stockNavTree } from '../app/stock/side-nav-tree';
import { purchasesNavTree } from '../app/purchases/side-nav-tree';
import { socialNavTree } from '../app/social/side-nav-tree';
import { accountingNavTree } from '../app/accounting/side-nav-tree';
import { hrLookupNavTree } from '../app/hr-lookups/side-nav-tree';
import { hrNavTree } from '../app/hr/side-nav-tree';
import { payrollNavTree } from '../app/payroll/side-nav-tree';
import { treasuryNavTree } from '../app/treasury/side-nav-tree';

export const environment = {
    production: true,
};

export const navBar = [
    administrationNavTree,
    logisticsAdminNavTree,
    purchasesNavTree,
    stockNavTree,
    contractsNavTree,
    socialNavTree,
    ssalesNavTree,
    financeNavTree,
    hrLookupNavTree,
    hrNavTree,
    payrollNavTree,
    accountingNavTree,
    treasuryNavTree,
    dashboardNavTree,
    workflowNavTree,
];

export const langAssets = [
    ['assets/locale/', ''],
    ['assets/locale/administration_', 'ADMINISTRATION_'],
    ['assets/locale/stock_', 'STOCK_'],
    ['assets/locale/common_', 'COMMON_'],
    ['assets/locale/logistics_', 'LOGISTICS_'],
    ['assets/locale/purchases_', 'PURCHASES_'],
    ['assets/locale/bl_', 'BL_'],
    ['assets/locale/webarch_', 'WAR_'],
    ['assets/locale/assets_', 'ASSET_'],
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
        path: SERVICE_SALES,
        loadChildren: () => import('../app/service-sales/service-sales.module').then(m => m.ServiceSalesModule)
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
    {
        path: PAYROLL_APP_URL,
        loadChildren: () => import('../app/payroll/payroll.module').then(m => m.PayrollModule)
    },
    {
        path: HR_APP_URL,
        loadChildren: () => import('../app/hr/hr.module').then(m => m.HRModule)
    },
    {
        path: ACCOUNTING_APP_URL,
        loadChildren: () => import('../app/accounting/accounting.module').then(m => m.AccountingModule)
    },
    {
        path: TREASURY_APP_URL,
        loadChildren: () => import('../app/treasury/treasury.module').then(m => m.TreasuryModule)
    },
    {
        path: SOCIAL_APP_URL,
        loadChildren: () => import('../app/social/social.module').then(m => m.SocialModule)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ACCOUNTING',
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
    'SOCIAL'
];
