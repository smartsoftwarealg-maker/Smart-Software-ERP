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
    aaNavTree,
    cmmsNavTree,
    productionNavTree,
];

export const langAssets = [
    ['assets/locale/', ''],
    ['assets/locale/administration_', 'ADMINISTRATION_'],
    ['assets/locale/stock_', 'STOCK_'],
    ['assets/locale/common_', 'COMMON_'],
    ['assets/locale/sales_', 'SALES_'],
    ['assets/locale/logistics_', 'LOGISTICS_'],
    ['assets/locale/purchases_', 'PURCHASES_'],
    ['assets/locale/bl_', 'BL_'],
    ['assets/locale/webarch_', 'WAR_'],
    ['assets/locale/accounting_', 'ACC_'],
    ['assets/locale/cmms_', 'CMMS_'],
    ['assets/locale/production_', 'PROD_'],
];

export const appRoutes: Routes = [
    {
        path: ARCH_VIEWER_URL,
        loadChildren: () =>
            import('../app/archive-viewer/archive-viewer.module').then(
                (m) => m.ArchiveViewerModule,
            ),
    },
    {
        path: INDEX_PAGE_URL,
        component: MainPageComponent,
        canActivate: [CanActivateService],
    },
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () =>
            import('../app/organizations/organizations.module').then(
                (m) => m.OrganizationsModule,
            ),
    },
    {
        path: CMMS_APP_URL,
        loadChildren: () =>
            import('../app/cmms/cmms.module').then((m) => m.CmmsModule),
    },
    {
        path: STOCK_APP_URL,
        loadChildren: () =>
            import('../app/stock/stock.module').then((m) => m.StockModule),
    },
    {
        path: SALES_APP_URL,
        loadChildren: () =>
            import('../app/sales/sales.module').then((m) => m.SalesModule),
    },
    {
        path: ADMINISTRATION_APP_URL,
        loadChildren: () =>
            import('../app/administration/administration.module').then(
                (m) => m.AdministrationModule,
            ),
    },
    {
        path: PAYROLL_APP_URL,
        loadChildren: () =>
            import('../app/payroll/payroll.module').then(
                (m) => m.PayrollModule,
            ),
    },
    {
        path: HR_APP_URL,
        loadChildren: () =>
            import('../app/hr/hr.module').then((m) => m.HRModule),
    },
    {
        path: DASHBOARD_APP_URL,
        loadChildren: () =>
            import('../app/dashboard/app-dashboard.module').then(
                (m) => m.AppDashboardModule,
            ),
    },
    {
        path: PURCHASES_APP_URL,
        loadChildren: () =>
            import('../app/purchases/purchases.module').then(
                (m) => m.PurchasesModule,
            ),
    },
    {
        path: LOGISTICS_APP_URL,
        loadChildren: () =>
            import('../app/logistics-admin/logistics-admin.module').then(
                (m) => m.LogisticsAdminModule,
            ),
    },
    {
        path: WEBARCH_APP_URL,
        loadChildren: () =>
            import('../app/web-arch/web-arch.module').then(
                (m) => m.WebArchModule,
            ),
    },
    {
        path: WORK_FLOW_APP_URL,
        loadChildren: () =>
            import('../app/workflow/workflow.module').then(
                (m) => m.WorkflowModule,
            ),
    },
    {
        path: SHOPPING_CART_APP_URL,
        loadChildren: () =>
            import('../app/shopping-cart/shopping-cart.module').then(
                (m) => m.ShoppingCartModule,
            ),
    },
    {
        path: COSTING_APP_URL,
        loadChildren: () =>
            import('../app/costing/costing.module').then(
                (m) => m.CostingModule,
            ),
    },
    {
        path: SOCIAL_APP_URL,
        loadChildren: () =>
            import('../app/social/social.module').then((m) => m.SocialModule),
    },
    {
        path: PRODUCTION_APP_URL,
        loadChildren: () =>
            import('../app/production/production.module').then(
                (m) => m.ProductionModule,
            ),
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
];
