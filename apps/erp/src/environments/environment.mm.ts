import { administrationNavTree } from '../app/administration/side-nav-tree';
import { organizationsNavTree } from '../app/organizations/side-nav-tree';
import { logisticsAdminNavTree } from '../app/logistics-admin/side-nav-tree';
import { purchasesNavTree } from '../app/purchases/side-nav-tree';
import { stockNavTree } from '../app/stock/side-nav-tree';
import { contractsNavTree } from '../app/contracts/side-nav-tree';
import { Routes } from '@angular/router';
import { CanActivateService, INDEX_PAGE_URL } from '@ss/common/api-common';
import { MainPageComponent } from '@ss/common/ui-main-page';
import {
    ADMINISTRATION_APP_URL,
    DASHBOARD_APP_URL,
    HR_APP_URL,
    LOGISTICS_APP_URL,
    ORGANIZATIONS_APP_URL,
    PAYROLL_APP_URL,
    PURCHASES_APP_URL,
    SALES_APP_URL,
    STOCK_APP_URL,
    WEBARCH_APP_URL,
    SHOPPING_CART_APP_URL,
    WORK_FLOW_APP_URL,
    ARCH_VIEWER_URL,
    CMMS_APP_URL,
    COSTING_APP_URL,
    SOCIAL_APP_URL,
    PRODUCTION_APP_URL,
} from '../app/common';
import { aaNavTree } from '../app/archive-viewer/side-nav-tree';
import { cmmsNavTree } from '../app/cmms/side-nav-tree';
import { productionNavTree } from '../app/production/side-nav-tree';
import {salesNavTree} from "../app/sales/side-nav-tree";
import {financeNavTree} from "../app/finance/side-nav-tree";
import {hrLookupNavTree} from "../app/hr-lookups/side-nav-tree";
import {hrNavTree} from "../app/hr/side-nav-tree";
import {payrollNavTree} from "../app/payroll/side-nav-tree";
import {missionsNavTree} from "../app/missions/side-nav-tree";
import {accountingNavTree} from "../app/accounting/side-nav-tree";
import {assetsNavTree} from "../app/assets-app/side-nav-tree";
import {treasuryNavTree} from "../app/treasury/side-nav-tree";
import {budgetNavTree} from "../app/budget/side-nav-tree";
import {dashboardNavTree} from "../app/dashboard/side-nav-tree";
import {workflowNavTree} from "../app/workflow/side-nav-tree";
import {viewerRoutes} from "../app/archive-viewer/routes";

export const environment = {
    production: true,
    multiCompany: false,
    company: null,
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
    missionsNavTree,
    accountingNavTree,
    assetsNavTree,
    treasuryNavTree,
    budgetNavTree,
    cmmsNavTree,
    productionNavTree,
    dashboardNavTree,
    workflowNavTree,
    aaNavTree,
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
    ['assets/locale/att_', 'ATT_'],
    ['assets/locale/cmms_', 'CMMS_'],
    ['assets/locale/production_', 'PROD_'],
];

export const appRoutes: Routes = [
    {
        path: ARCH_VIEWER_URL,
        loadChildren: () => import('../app/archive-viewer/routes').then((m) => m.viewerRoutes),
    },
    {
        path: INDEX_PAGE_URL,
        component: MainPageComponent,
        canActivate: [CanActivateService],
    },
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () => import('../app/organizations/routes').then( (m) => m.orgRoutes ),
    },
    {
        path: CMMS_APP_URL,
        loadChildren: () => import('../app/cmms/routes').then((m) => m.cmmsRoutes),
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
        loadChildren: () => import('../app/logistics-admin/routes').then(m => m.logisticsAdminRoutes)
    },
    {
        path: PAYROLL_APP_URL,
        loadChildren: () =>
            import('../app/payroll/routes').then((m) => m.payrollRoutes),
    },
    {
        path: HR_APP_URL,
        loadChildren: () =>  import('../app/hr/routes').then((m) => m.hrRoutes),
    },
    {
        path: DASHBOARD_APP_URL,
        loadChildren: () =>
            import('../app/dashboard/routes').then((m) => m.dashboardRoutes),
    },
    {
        path: PURCHASES_APP_URL,
        loadChildren: () =>
            import('../app/purchases/routes').then((m) => m.purchasesRoutes),
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
        path: WORK_FLOW_APP_URL,
        loadChildren: () => import('../app/workflow/routes').then(m => m.workflowRoutes)
    },
    {
        path: SHOPPING_CART_APP_URL,
        loadChildren: () => import('../app/workflow/routes').then(m => m.workflowRoutes)
    },
    {
        path: COSTING_APP_URL,
        loadChildren: () => import('../app/costing/routes').then(m => m.costingRoutes)
    },
    {
        path: SOCIAL_APP_URL,
        loadChildren: () => import('../app/social/routes').then((m) => m.socialRotes),
    },
    {
        path: PRODUCTION_APP_URL,
        loadChildren: () => import('../app/production/routes').then(m => m.prodRoutes)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
];
