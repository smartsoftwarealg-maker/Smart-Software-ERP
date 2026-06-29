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
import {CanActivateService, INDEX_PAGE_URL, SideNavNode} from '@ss/common/api-common';
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
    WORK_FLOW_APP_URL, ARCH_VIEWER_URL, MISSIONS_APP_URL, PAYROLL_APP_URL, HR_APP_URL, TREASURY_APP_URL, ASSETS_APP_URL,
    BUDGET_APP_URL
} from '../app/common';
import {Routes} from '@angular/router';
import {workflowNavTree} from '../app/workflow/side-nav-tree';
import { aaNavTree } from '../app/archive-viewer/side-nav-tree';
import { accountingNavTree } from '../app/accounting/side-nav-tree';
import { assetsNavTree } from '../app/assets-app/side-nav-tree';
import { hrLookupNavTree } from '../app/hr-lookups/side-nav-tree';
import { hrNavTree } from '../app/hr/side-nav-tree';
import { payrollNavTree } from '../app/payroll/side-nav-tree';
import { attendanceNavTree } from '../app/attendance/side-nav-tree';
import { missionsNavTree } from '../app/missions/side-nav-tree';
import { treasuryNavTree } from '../app/treasury/side-nav-tree';
import {budgetNavTree} from '../app/budget/side-nav-tree';
import {accRoutes} from "../app/accounting/routes";

export const environment = {
    production: true,
    company: <string|null>null,
    homePage: <string|null>null,
    multiCompany: false
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
    hrLookupNavTree,
    hrNavTree,
    payrollNavTree,
    attendanceNavTree,
    missionsNavTree,
    accountingNavTree,
    assetsNavTree,
    workflowNavTree,
    dashboardNavTree,
    treasuryNavTree,
    budgetNavTree,
    aaNavTree
];

export const langAssets = [
    ['assets/locale/', ''],
    ['assets/locale/administration_', 'ADMINISTRATION_'],
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
    ['assets/locale/missions_', 'MISSION_'],
    ['assets/locale/assets_', 'ASSET_'],
    ['assets/locale/treasury_', 'TRS_'],
    ['assets/locale/accounting_', 'ACC_'],
    ['assets/locale/social_', 'SOCIAL_'],
    ['assets/locale/budget_', 'BUD_'],
];

export const appRoutes: Routes =  [
    {
        path: INDEX_PAGE_URL,
        component: MainPageComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ARCH_VIEWER_URL,
        loadChildren: () => import('../app/archive-viewer/routes').then(m => m.viewerRoutes)
    },
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () => import('../app/organizations/routes').then(m => m.orgRoutes)
    },
    {
        path: BUDGET_APP_URL,
        loadChildren: () => import('../app/budget/routes').then(m => m.budgetRoutes)
    },
    {
        path: WORK_FLOW_APP_URL,
        loadChildren: () => import('../app/workflow/routes').then(m => m.workflowRoutes)
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
        path: ASSETS_APP_URL,
        loadChildren: () => import('../app/assets-app/routes').then(m => m.assetsRoutes)
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
        path: WEBARCH_APP_URL,
        loadChildren: () => import('../app/web-arch/routes').then(m => m.webArchRoutes)
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
        path: MISSIONS_APP_URL,
        loadChildren: () => import('../app/missions/routes').then(m => m.missionsRoutes)
    },
    {
        path: CONTRACTS_APP_URL,
        loadChildren: () => import('../app/contracts/routes').then(m => m.contractRoutes)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ADMINISTRATION', 'DASHBOARD-APP', 'FINANCE', 'HRMASTER',
    'STOCK', 'LOGISTICS', 'LOGISTICS-ADMINISTRATION', 'ORGANIZATION', 'PAYMENTS',
    'PURCHASES', 'SALES', 'WORKFLOW', 'PROJECTS', 'TREASURY'];
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
