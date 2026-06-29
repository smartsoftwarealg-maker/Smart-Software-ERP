import {administrationNavTree} from '../app/administration/side-nav-tree';
import {organizationsNavTree} from '../app/organizations/side-nav-tree';
import {logisticsAdminNavTree} from '../app/logistics-admin/side-nav-tree';
import {purchasesNavTree} from '../app/purchases/side-nav-tree';
import {stockNavTree} from '../app/stock/side-nav-tree';
import {salesNavTree} from '../app/sales/side-nav-tree';
import {financeNavTree} from '../app/finance/side-nav-tree';
import {hrNavTree} from '../app/hr/side-nav-tree';
import {payrollNavTree} from '../app/payroll/side-nav-tree';
import {accountingNavTree} from '../app/accounting/side-nav-tree';
import {assetsNavTree} from '../app/assets-app/side-nav-tree';
import {treasuryNavTree} from '../app/treasury/side-nav-tree';
import {dashboardNavTree} from '../app/dashboard/side-nav-tree';
import {scheduledSalesNavTree} from '../app/scheduled-sales/side-nav-tree';
import {missionsNavTree} from '../app/missions/side-nav-tree';
import {contractsNavTree} from '../app/contracts/side-nav-tree';
import {Routes} from '@angular/router';
import {CanActivateService, INDEX_PAGE_URL} from '@ss/common/api-common';
import {MainPageComponent} from '@ss/common/ui-main-page';
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
    SCHEDULED_SALES_APP_URL,
    STOCK_APP_URL,
    TREASURY_APP_URL,
    WEBARCH_APP_URL,
    MISSIONS_APP_URL,
    CONTRACTS_APP_URL,
    SHOPPING_CART_APP_URL,
    FOOD_CART_APP_URL,
    WORK_FLOW_APP_URL,
    BUDGET_APP_URL,
    LTM_APP_URL,
    FURNITURE_APP_URL,
    ATTENDANCE_APP_URL,
    ARCH_VIEWER_URL,
    CMMS_APP_URL,
    CRM_APP_URL,
    PARK_APP_URL,
    SERVICE_SALES, COSTING_APP_URL, GICA_APP_URL, SOCIAL_APP_URL, PRODUCTION_APP_URL
} from '../app/common';
import {hrLookupNavTree} from '../app/hr-lookups/side-nav-tree';
import {foodNavTree} from '../app/food/side-nav-tree';
import {workflowNavTree} from '../app/workflow/side-nav-tree';
import {budgetNavTree} from '../app/budget/side-nav-tree';
import {ltmNavTree} from '../app/ltm/side-nav-tree';
import {furnitureNavTree} from '../app/furniture/side-nav-tree';
import {attendanceNavTree} from '../app/attendance/side-nav-tree';
import { aaNavTree } from '../app/archive-viewer/side-nav-tree';
import { parkNavTree } from '../app/park/side-nav-tree';
import { cmmsNavTree } from '../app/cmms/side-nav-tree';
import { crmNavTree } from '../app/crm/side-nav-tree';
import { ssalesNavTree } from '../app/service-sales/side-nav-tree';
import { costingNavTree } from '../app/costing/side-nav-tree';
import { gicaNavTree } from '../app/gica/side-nav-tree';
import { socialNavTree } from '../app/social/side-nav-tree';
import { productionNavTree } from '../app/production/side-nav-tree';
import {manufacturingNavTree} from "../app/manufacturing/side-nav-tree";

export const environment = {
    production: true,
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
    contractsNavTree,
    salesNavTree,
    ssalesNavTree,
    financeNavTree,
    hrLookupNavTree,
    hrNavTree,
    payrollNavTree,
    attendanceNavTree,
    missionsNavTree,
    gicaNavTree,
    // webArchNavTree,
    accountingNavTree,
    assetsNavTree,
    furnitureNavTree,
    treasuryNavTree,
    budgetNavTree,
    dashboardNavTree,
    scheduledSalesNavTree,
    workflowNavTree,
    ltmNavTree,
    aaNavTree,
    parkNavTree,
    cmmsNavTree,
    crmNavTree,
    foodNavTree,
    costingNavTree,
    socialNavTree,
    productionNavTree,
    manufacturingNavTree
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
    ['assets/locale/missions_', 'MISSION_'],
    ['assets/locale/assets_', 'ASSET_'],
    ['assets/locale/treasury_', 'TRS_'],
    ['assets/locale/accounting_', 'ACC_'],
    ['assets/locale/ltm_', 'LTM_'],
    ['assets/locale/att_', 'ATT_'],
    ['assets/locale/budget_', 'BUD_'],
    ['assets/locale/cmms_', 'CMMS_'],
    ['assets/locale/crm_', 'CRM_'],
    ['assets/locale/park_', 'PARK_'],
    ['assets/locale/costing_', 'COST_'],
    ['assets/locale/social_', 'SOCIAL_'],
    ['assets/locale/production_', 'PROD_'],
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
        path: SERVICE_SALES,
        loadChildren: () => import('../app/service-sales/routes').then(m => m.ssalesRoutes)
    },
    {
        path: LTM_APP_URL,
        loadChildren: () => import('../app/ltm/routes').then(m => m.ltmRoutes)
    },
    {
        path: GICA_APP_URL,
        loadChildren: () => import('../app/gica/routes').then(m => m.gicaRoutes)
    },
    {
        path: PARK_APP_URL,
        loadChildren: () => import('../app/park/routes').then(m => m.parkRoutes)
    },
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () => import('../app/organizations/routes').then(m => m.orgRoutes)
    },
    {
        path: FURNITURE_APP_URL,
        loadChildren: () => import('../app/furniture/routes').then(m => m.furnitureRoutes)
    },
    {
        path: CMMS_APP_URL,
        loadChildren: () => import('../app/cmms/routes').then(m => m.cmmsRoutes)
    },
    {
        path: CRM_APP_URL,
        loadChildren: () => import('../app/crm/routes').then(m => m.crmRoutes)
    },
    {
        path: ATTENDANCE_APP_URL,
        loadChildren: () => import('../app/attendance/routes').then(m => m.attendanceRoutes)
    },
    {
        path: ACCOUNTING_APP_URL,
        loadChildren: () => import('../app/accounting/routes').then(m => m.accRoutes)
    },
    {
        path: BUDGET_APP_URL,
        loadChildren: () => import('../app/budget/routes').then(m => m.budgetRoutes)
    },
    {
        path: TREASURY_APP_URL,
        loadChildren: () => import('../app/treasury/routes').then(m => m.treasuryRoutes)
    },
    {
        path: SCHEDULED_SALES_APP_URL,
        loadChildren: () => import('../app/scheduled-sales/routes').then(m => m.scheduledSalesRoutes)
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
        path: ASSETS_APP_URL,
        loadChildren: () => import('../app/assets-app/routes').then(m => m.assetsRoutes)
    },
    {
        path: MISSIONS_APP_URL,
        loadChildren: () => import('../app/missions/routes').then(m => m.missionsRoutes)
    },
    {
        path: CONTRACTS_APP_URL,
        loadChildren: () => import('../app/contracts/routes').then(m => m.contractRoutes)
    },
    {
        path: FOOD_CART_APP_URL,
        loadChildren: () => import('../app/food/routes').then(m => m.foodRoutes)
    },
    {
        path: WORK_FLOW_APP_URL,
        loadChildren: () => import('../app/workflow/routes').then(m => m.workflowRoutes)
    },
    {
        path: SHOPPING_CART_APP_URL,
        loadChildren: () => import('../app/shopping-cart/routes').then(m => m.shoppingCartRoutes)
    },
    {
        path: COSTING_APP_URL,
        loadChildren: () => import('../app/costing/routes').then(m => m.costingRoutes)
    },
    {
        path: SOCIAL_APP_URL,
        loadChildren: () => import('../app/social/routes').then((m) => m.socialRoutes)
    },
    {
        path: PRODUCTION_APP_URL,
                loadChildren: () => import('../app/production/routes').then(m => m.prodRoutes)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ACCOUNTING', 'ADMINISTRATION', 'ASSETS', 'DASHBOARD-APP', 'FINANCE', 'HRMASTER',
    'STOCK', 'LOGISTICS', 'LOGISTICS-ADMINISTRATION', 'ORGANIZATION', 'PAYMENTS',
    'PAYROLL', 'ATTENDANCE', 'PURCHASES', 'SALES', 'WEBARCHIVE', 'TREASURY', 'LTM',
    'WORKFLOW', 'SCHEDULED_SALES', 'GICACARRER'];
