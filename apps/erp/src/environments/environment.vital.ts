import {administrationNavTree} from '../app/administration/side-nav-tree';
import {organizationsNavTree} from '../app/organizations/side-nav-tree';
import {logisticsAdminNavTree} from '../app/logistics-admin/side-nav-tree';
import {purchasesNavTree} from '../app/purchases/side-nav-tree';
import {stockNavTree} from '../app/stock/side-nav-tree';
import {salesNavTree} from '../app/sales/side-nav-tree';
import {hrNavTree} from '../app/hr/side-nav-tree';
import {payrollNavTree} from '../app/payroll/side-nav-tree';
import {accountingNavTree} from '../app/accounting/side-nav-tree';
import {assetsNavTree} from '../app/assets-app/side-nav-tree';
import {treasuryNavTree} from '../app/treasury/side-nav-tree';
import {dashboardNavTree} from '../app/dashboard/side-nav-tree';
import {missionsNavTree} from '../app/missions/side-nav-tree';
import {contractsNavTree} from '../app/contracts/side-nav-tree';
import {Routes} from '@angular/router';
import {CanActivateService, INDEX_PAGE_URL} from '@ss/common/api-common';
import {
    ACCOUNTING_APP_URL,
    ADMINISTRATION_APP_URL,
    ASSETS_APP_URL,
    DASHBOARD_APP_URL,
    FINANCE_APP_URL,
    HR_APP_URL,
    LOGISTICS_APP_URL,
    ORGANIZATIONS_APP_URL,
    PAYROLL_APP_URL,
    PURCHASES_APP_URL,
    SALES_APP_URL,
    STOCK_APP_URL,
    TREASURY_APP_URL,
    WEBARCH_APP_URL,
    MISSIONS_APP_URL,
    CONTRACTS_APP_URL,
    WORK_FLOW_APP_URL,
    ATTENDANCE_APP_URL,
    ARCH_VIEWER_URL,
    PRODUCTION_APP_URL
} from '../app/common';
import {hrLookupNavTree} from '../app/hr-lookups/side-nav-tree';
import {workflowNavTree} from '../app/workflow/side-nav-tree';
import { aaNavTree } from '../app/archive-viewer/side-nav-tree';
import { ssalesNavTree } from '../app/service-sales/side-nav-tree';
import { productionNavTree } from '../app/production/side-nav-tree';
import {attendanceNavTree} from '../app/attendance/side-nav-tree';
import {MainPageComponent} from '@ss/common/ui-main-page';
import {financeNavTree} from "../app/finance/side-nav-tree";


export const environment = {
    production: true,
};

export const navBar = [
    administrationNavTree,
    organizationsNavTree,
    logisticsAdminNavTree,
    purchasesNavTree,
    stockNavTree,
    contractsNavTree,
    salesNavTree,
    ssalesNavTree,
    financeNavTree,
    hrLookupNavTree,
    hrNavTree,
    payrollNavTree,
    attendanceNavTree,
    missionsNavTree,
    accountingNavTree,
    assetsNavTree,
    treasuryNavTree,
    dashboardNavTree,
    workflowNavTree,
    productionNavTree,
    aaNavTree,
];

export const langAssets = [
    ['assets/locale/', ''],
    ['assets/locale/att_', 'ATT_'],
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
    ['assets/locale/missions_', 'MISSION_'],
    ['assets/locale/assets_', 'ASSET_'],
    ['assets/locale/treasury_', 'TRS_'],
    ['assets/locale/accounting_', 'ACC_'],
    ['assets/locale/att_', 'ATT_'],
    ['assets/locale/budget_', 'BUD_'],
    ['assets/locale/park_', 'PARK_'],
    ['assets/locale/social_', 'SOCIAL_'],
    ['assets/locale/production_', 'PROD_'],
];

export const appRoutes: Routes =  [
    {
        path: ARCH_VIEWER_URL,
        loadChildren: () => import('../app/archive-viewer/archive-viewer.module').then(m => m.ArchiveViewerModule)
    },
    {
        path: INDEX_PAGE_URL,
        component: MainPageComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () => import('../app/organizations/organizations.module').then(m => m.OrganizationsModule)
    },
    {
        path: ATTENDANCE_APP_URL,
        loadChildren: () => import('../app/attendance/attendance.module').then(m => m.AttendanceModule)
    },
    {
        path: ACCOUNTING_APP_URL,
        loadChildren: () => import('../app/accounting/accounting.module').then(m => m.AccountingModule)
    },
    {
        path: ATTENDANCE_APP_URL,
        loadChildren: () => import('../app/attendance/attendance.module').then(m => m.AttendanceModule)
    },
    {
        path: TREASURY_APP_URL,
        loadChildren: () => import('../app/treasury/treasury.module').then(m => m.TreasuryModule)
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
        path: PAYROLL_APP_URL,
        loadChildren: () => import('../app/payroll/payroll.module').then(m => m.PayrollModule)
    },
    {
        path: HR_APP_URL,
        loadChildren: () => import('../app/hr/hr.module').then(m => m.HRModule)
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
    {
        path: ASSETS_APP_URL,
        loadChildren: () => import('../app/assets-app/assets.module').then(m => m.AssetsModule)
    },
    {
        path: MISSIONS_APP_URL,
        loadChildren: () => import('../app/missions/missions.module').then(m => m.MissionsModule)
    },
    {
        path: CONTRACTS_APP_URL,
        loadChildren: () => import('../app/contracts/contracts.module').then(m => m.ContractsModule)
    },
    {
        path: WORK_FLOW_APP_URL,
        loadChildren: () => import('../app/workflow/workflow.module').then(m => m.WorkflowModule)
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
    'PAYROLL', 'PURCHASES', 'SALES', 'TREASURY',     'WORKFLOW', 'ATTENDANCE'];
