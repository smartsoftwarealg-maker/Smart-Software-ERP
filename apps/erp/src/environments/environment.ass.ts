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
    SERVICE_SALES,
    PURCHASES_APP_URL,
    PAYROLL_APP_URL,
    HR_APP_URL,
    ACCOUNTING_APP_URL,
    TREASURY_APP_URL,
    SOCIAL_APP_URL,
    ASSETS_APP_URL, ATTENDANCE_APP_URL
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
import { assetsNavTree } from '../app/assets-app/side-nav-tree';
import { salesNavTree } from '../app/sales/side-nav-tree';
import {attendanceNavTree} from "../app/attendance/side-nav-tree";

export const environment = {
    production: true,
};

export const navBar = [
    administrationNavTree,
    logisticsAdminNavTree,
    purchasesNavTree,
    stockNavTree,
    contractsNavTree,
    assetsNavTree,
    socialNavTree,
    ssalesNavTree,
    salesNavTree,
    financeNavTree,
    hrLookupNavTree,
    hrNavTree,
    payrollNavTree,
    attendanceNavTree,
    accountingNavTree,
    treasuryNavTree,
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
    ['assets/locale/att_',            'ATT_'],
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
        path: ATTENDANCE_APP_URL,
        loadChildren: () => import('../app/attendance/routes').then(m => m.attendanceRoutes)
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
        path: SALES_APP_URL,
        loadChildren: () => import('../app/sales/routes').then(m => m.salesRoutes)
    },
    {
        path: SERVICE_SALES,
        loadChildren: () => import('../app/service-sales/routes').then(m => m.ssalesRoutes)
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
    {
        path: PAYROLL_APP_URL,
        loadChildren: () => import('../app/payroll/routes').then(m => m.payrollRoutes)
    },
    {
        path: HR_APP_URL,
        loadChildren: () => import('../app/hr/routes').then(m => m.hrRoutes)
    },
    {
        path: ASSETS_APP_URL,
        loadChildren: () => import('../app/assets-app/routes').then(m => m.assetsRoutes)
    },
    {
        path: ACCOUNTING_APP_URL,
        loadChildren: () => import('../app/accounting/routes').then(m => m.accRoutes)
    },
    {
        path: TREASURY_APP_URL,
        loadChildren: () => import('../app/treasury/routes').then(m => m.treasuryRoutes)
    },
    {
        path: SOCIAL_APP_URL,
        loadChildren: () => import('../app/social/routes').then((m) => m.socialRoutes)
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
    'SOCIAL',
    'ATTENDANCE'
];
