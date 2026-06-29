import {administrationNavTree} from '../app/administration/side-nav-tree';
import {organizationsNavTree} from '../app/organizations/side-nav-tree';
import {hrNavTree} from '../app/hr/side-nav-tree';
import {payrollNavTree} from '../app/payroll/side-nav-tree';
import {Routes} from '@angular/router';
import {CanActivateService, INDEX_PAGE_URL} from '@ss/common/api-common';
import {MainPageComponent} from '@ss/common/ui-main-page';
import {
    ADMINISTRATION_APP_URL,
    DASHBOARD_APP_URL,
    HR_APP_URL,
    ORGANIZATIONS_APP_URL,
    PAYROLL_APP_URL,
    WORK_FLOW_APP_URL,
    ARCH_VIEWER_URL, ATTENDANCE_APP_URL, ACCOUNTING_APP_URL, PURCHASES_APP_URL, LOGISTICS_APP_URL, FINANCE_APP_URL,
    STOCK_APP_URL
} from '../app/common';
import {hrLookupNavTree} from '../app/hr-lookups/side-nav-tree';
import {workflowNavTree} from '../app/workflow/side-nav-tree';
import { aaNavTree } from '../app/archive-viewer/side-nav-tree';
import { gicaNavTree } from '../app/gica/side-nav-tree';
import {dashboardNavTree} from "../app/dashboard/side-nav-tree";
import {attendanceNavTree} from "../app/attendance/side-nav-tree";
import {dashboardRoutes} from "../app/dashboard/routes";
import {accountingNavTree} from "../app/accounting/side-nav-tree";
import {stockNavTree} from "../app/stock/side-nav-tree";
import {purchasesNavTree} from "../app/purchases/side-nav-tree";
import {logisticsAdminNavTree} from "../app/logistics-admin/side-nav-tree";

export const environment = {
    production: false,
    multiCompany: false,
    company: <string>null,
    homePage: <string>null,
};

export const navBar = [
    administrationNavTree,
    organizationsNavTree,
    logisticsAdminNavTree,
    purchasesNavTree,
    stockNavTree,
    hrLookupNavTree,
    hrNavTree,
    payrollNavTree,
    attendanceNavTree,
    accountingNavTree,
    dashboardNavTree,
    aaNavTree
];

export const langAssets = [
    ['assets/locale/', ''],
    ['assets/locale/bl_', 'BL_'],
    ['assets/locale/administration_', 'ADMINISTRATION_'],
    ['assets/locale/payroll_', 'PAYROLL_'],
    ['assets/locale/common_', 'COMMON_'],
    ['assets/locale/remuneration_', 'REMUN_'],
    ['assets/locale/logistics_', 'LOGISTICS_'],
    ['assets/locale/att_', 'ATT_'],
    ['assets/locale/missions_', 'MISSION_'],
    ['assets/locale/accounting_', 'ACC_'],
    ['assets/locale/purchases_', 'PURCHASES_'],
    ['assets/locale/stock_', 'STOCK_'],
];

export const appRoutes: Routes =  [
    {
        path: ARCH_VIEWER_URL,
        loadChildren: () => import('../app/archive-viewer/routes').then(m => m.viewerRoutes)
    },
    {
        path: INDEX_PAGE_URL,
        component: MainPageComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ATTENDANCE_APP_URL,
        loadChildren: () => import('../app/attendance/routes').then(m => m.attendanceRoutes)
    },
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () => import('../app/organizations/routes').then(m => m.orgRoutes)
    },
    {
        path: ADMINISTRATION_APP_URL,
        loadChildren: () => import('../app/administration/routes').then(m => m.administrationRoutes)
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
        path: DASHBOARD_APP_URL,
        loadChildren: () => import('../app/dashboard/routes').then(m => m.dashboardRoutes)
    },
    {
        path: PURCHASES_APP_URL,
        loadChildren: () => import('../app/purchases/routes').then(m => m.purchasesRoutes)
    },
    {
        path: FINANCE_APP_URL,
        loadChildren: () => import('../app/finance/routes').then(m => m.financeRoutes)
    },
    {
        path: STOCK_APP_URL,
        loadChildren: () => import('../app/stock/routes').then(m => m.stockRoutes)
    },
    {
        path: LOGISTICS_APP_URL,
        loadChildren: () => import('../app/logistics-admin/routes').then(m => m.logisticsAdminRoutes)
    },
    {
        path: ACCOUNTING_APP_URL,
        loadChildren: () => import('../app/accounting/routes').then(m => m.accRoutes)
    },
    {
        path: WORK_FLOW_APP_URL,
        loadChildren: () => import('../app/workflow/routes').then(m => m.workflowRoutes)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ADMINISTRATION', 'DASHBOARD-APP', 'HRMASTER',
    'ORGANIZATION', 'PAYROLL', 'LTM', 'WORKFLOW',
      'SCHEDULED_SALES'];
