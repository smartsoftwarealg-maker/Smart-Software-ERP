import {administrationNavTree} from '../app/administration/side-nav-tree';
import {organizationsNavTree} from '../app/organizations/side-nav-tree';
import {assetsNavTree} from '../app/assets-app/side-nav-tree';
import {Routes} from '@angular/router';
import {MainPageComponent} from '../../../../libs/common/ui-main-page/src';
import { aaNavTree } from '../app/archive-viewer/side-nav-tree';
import {
    ADMINISTRATION_APP_URL, ARCH_VIEWER_URL,
    ASSETS_APP_URL,
    DASHBOARD_APP_URL,
    ORGANIZATIONS_APP_URL, WORK_FLOW_APP_URL
} from '../app/common';
import {dashboardNavTree} from '../app/dashboard/side-nav-tree';
import {workflowNavTree} from '../app/workflow/side-nav-tree';
import {loginGuard} from '../app/erp-guards';
import {INDEX_PAGE_URL} from '../../../../libs/common/api-common/src';

export const environment = {
    production: true,
};

export const navBar = [
    administrationNavTree,
    organizationsNavTree,
    dashboardNavTree,
    workflowNavTree,
    assetsNavTree,
    aaNavTree,
];

export const langAssets = [
    ['assets/locale/', ''],
    ['assets/locale/administration_', 'ADMINISTRATION_'],
    ['assets/locale/common_', 'COMMON_'],
    ['assets/locale/logistics_', 'LOGISTICS_'],
    ['assets/locale/purchases_', 'PURCHASES_'],
    ['assets/locale/bl_', 'BL_'],
    ['assets/locale/assets_', 'ASSET_'],
    ['assets/locale/accounting_', 'ACC_'],
];

export const appRoutes: Routes =  [
    {
        path: ARCH_VIEWER_URL,
        loadChildren: () => import('../app/archive-viewer/archive-viewer.module').then(m => m.ArchiveViewerModule)
    },
    {
        path: INDEX_PAGE_URL,
        component: MainPageComponent,
        canActivate: [loginGuard]
    },
    {
        path: ORGANIZATIONS_APP_URL,
        loadChildren: () => import('../app/organizations/organizations.module').then(m => m.OrganizationsModule)
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
        path: WORK_FLOW_APP_URL,
        loadChildren: () => import('../app/workflow/workflow.module').then(m => m.WorkflowModule)
    },
    {
        path: DASHBOARD_APP_URL,
        loadChildren: () => import('../app/dashboard/app-dashboard.module').then(m => m.AppDashboardModule)
    },
    {
        path: ASSETS_APP_URL,
        loadChildren: () => import('../app/assets-app/assets.module').then(m => m.AssetsModule)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ADMINISTRATION', 'ASSETS', 'DASHBOARD-APP',
    'STOCK', 'ORGANIZATION', 'WORKFLOW'];
