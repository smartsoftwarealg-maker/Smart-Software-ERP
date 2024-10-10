// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {administrationNavTree} from '../app/administration/side-nav-tree';
import {organizationsNavTree} from '../app/organizations/side-nav-tree';
import {logisticsAdminNavTree} from '../app/logistics-admin/side-nav-tree';
import {purchasesNavTree} from '../app/purchases/side-nav-tree';
import {stockNavTree} from '../app/stock/side-nav-tree';
import {salesNavTree} from '../app/sales/side-nav-tree';
import {financeNavTree} from '../app/finance/side-nav-tree';
import {dashboardNavTree} from '../app/dashboard/side-nav-tree';
import {CanActivateService, INDEX_PAGE_URL} from '@ss/common/api-common';
import {contractsNavTree} from '../app/contracts/side-nav-tree';
import {MainPageComponent} from '@ss/common/ui-main-page';
import {
    ACCOUNTING_APP_URL,
    ADMINISTRATION_APP_URL,
    CONTRACTS_APP_URL,
    DASHBOARD_APP_URL,
    FINANCE_APP_URL,
    LOGISTICS_APP_URL,
    ORGANIZATIONS_APP_URL,
    PURCHASES_APP_URL,
    SALES_APP_URL,
    STOCK_APP_URL,
    WEBARCH_APP_URL,
    WORK_FLOW_APP_URL, ARCH_VIEWER_URL
} from '../app/common';
import {Routes} from '@angular/router';
import {workflowNavTree} from '../app/workflow/side-nav-tree';
import { aaNavTree } from '../app/archive-viewer/side-nav-tree';

export const environment = {
    production: false,
};

export const navBar = [
    administrationNavTree,
    organizationsNavTree,
    logisticsAdminNavTree,
    purchasesNavTree,
    stockNavTree,
    contractsNavTree,
    salesNavTree,
    financeNavTree,
    dashboardNavTree,
    // shoppingCartNavTree,
    workflowNavTree,
    aaNavTree
];

export const langAssets = [
    ['assets/locale/', ''],
    ['assets/locale/administration_', 'ADMINISTRATION_'],
    ['assets/locale/sch_', 'SCH_'],
    ['assets/locale/stock_', 'STOCK_'],
    ['assets/locale/payroll_', 'PAYROLL_'],
    ['assets/locale/common_', 'COMMON_'],
    ['assets/locale/remuneration_', 'REMUN_'],
    ['assets/locale/sales_', 'SALES_'],
    ['assets/locale/logistics_', 'LOGISTICS_'],
    ['assets/locale/att_', 'ATT_'],
    ['assets/locale/purchases_', 'PURCHASES_'],
    ['assets/locale/bl_', 'BL_'],
    ['assets/locale/webarch_', 'WAR_'],
    ['assets/locale/assets_', 'ASSET_'],
    ['assets/locale/treasury_', 'TRS_'],
    ['assets/locale/accounting_', 'ACC_'],
];

export const appRoutes: Routes =  [
    {
        path: INDEX_PAGE_URL,
        component: MainPageComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ARCH_VIEWER_URL,
        loadChildren: () => import('../app/archive-viewer/archive-viewer.module').then(m => m.ArchiveViewerModule)
    },
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () => import('../app/organizations/organizations.module').then(m => m.OrganizationsModule)
    },
    {
        path: WORK_FLOW_APP_URL,
        loadChildren: () => import('../app/workflow/workflow.module').then(m => m.WorkflowModule)
    },
    {
        path: ACCOUNTING_APP_URL,
        loadChildren: () => import('../app/accounting/accounting.module').then(m => m.AccountingModule)
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
        path: WEBARCH_APP_URL,
        loadChildren: () => import('../app/web-arch/web-arch.module').then(m => m.WebArchModule)
    },
    // {
    //     path: MISSIONS_APP_URL,
    //     loadChildren: () => import('../app/missions/missions.module').then(m => m.MissionsModule)
    // },
    {
        path: CONTRACTS_APP_URL,
        loadChildren: () => import('../app/contracts/contracts.module').then(m => m.ContractsModule)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ADMINISTRATION', 'DASHBOARD-APP', 'FINANCE', 'HRMASTER',
    'STOCK', 'LOGISTICS', 'LOGISTICS-ADMINISTRATION', 'ORGANIZATION', 'PAYMENTS',
    'PURCHASES', 'SALES', 'WORKFLOW'];
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
