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
    SCHEDULED_SALES_APP_URL,
    WORK_FLOW_APP_URL,
    ARCH_VIEWER_URL,
    GICA_APP_URL, COSTING_APP_URL
} from '../app/common';
import {hrLookupNavTree} from '../app/hr-lookups/side-nav-tree';
import {workflowNavTree} from '../app/workflow/side-nav-tree';
import { aaNavTree } from '../app/archive-viewer/side-nav-tree';
import { gicaNavTree } from '../app/gica/side-nav-tree';
import { costingNavTree } from '../app/costing/side-nav-tree';

export const environment = {
    production: true,
};

export const navBar = [
    administrationNavTree,
    organizationsNavTree,
    hrLookupNavTree,
    hrNavTree,
    payrollNavTree,
    gicaNavTree,
    workflowNavTree,
    costingNavTree,
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
    ['assets/locale/missions_', 'MISSION_'],
    ['assets/locale/assets_', 'ASSET_'],
    ['assets/locale/treasury_', 'TRS_'],
    ['assets/locale/accounting_', 'ACC_'],
    ['assets/locale/ltm_', 'LTM_'],
    ['assets/locale/att_', 'ATT_'],
    ['assets/locale/budget_', 'BUD_'],
    ['assets/locale/cmms_', 'CMMS_'],
    ['assets/locale/park_', 'PARK_'],
    ['assets/locale/costing_', 'COST_'],
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
        path: GICA_APP_URL,
        loadChildren: () => import('../app/gica/gica.module').then(m => m.GicaModule)
    },
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () => import('../app/organizations/organizations.module').then(m => m.OrganizationsModule)
    },
    {
        path: SCHEDULED_SALES_APP_URL,
        loadChildren: () => import('../app/scheduled-sales/scheduled-sales.module').then(m => m.ScheduledSalesModule)
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
        path: GICA_APP_URL,
        loadChildren: () => import('../app/gica/gica.module').then(m => m.GicaModule)
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
        path: WORK_FLOW_APP_URL,
        loadChildren: () => import('../app/workflow/workflow.module').then(m => m.WorkflowModule)
    },
    {
        path: COSTING_APP_URL,
        loadChildren: () => import('../app/costing/costing.module').then(m => m.CostingModule)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ADMINISTRATION', 'DASHBOARD-APP', 'HRMASTER',
    'ORGANIZATION', 'PAYROLL', 'LTM', 'WORKFLOW', 'GICACARRER', 'SOCIAL'];
