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
    multiCompany: false,
    company: null,
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
    ['assets/locale/social_', 'SOCIAL_'],
];

export const appRoutes: Routes =  [
    {
        path: ARCH_VIEWER_URL,
        loadChildren: () => import('../app/archive-viewer/routes').then(m => m.viewerRoutes)
    },
    {
        path: INDEX_PAGE_URL,
        component: MainPageComponent,
        canActivate: [loginGuard]
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
        path: DASHBOARD_APP_URL,
        loadChildren: () => import('../app/dashboard/routes').then(m => m.dashboardRoutes)
    },
    {
        path: WORK_FLOW_APP_URL,
        loadChildren: () => import('../app/workflow/routes').then(m => m.workflowRoutes)
    },
    {
        path: DASHBOARD_APP_URL,
        loadChildren: () => import('../app/dashboard/routes').then(m => m.dashboardRoutes)
    },
    {
        path: ASSETS_APP_URL,
        loadChildren: () => import('../app/assets-app/routes').then(m => m.assetsRoutes)
    },
    { path: '', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' },
    { path: '**', redirectTo: INDEX_PAGE_URL, pathMatch: 'full' }
];

export const APPLICATION_LIST = [
    'ADMINISTRATION', 'ASSETS', 'DASHBOARD-APP',
    'STOCK', 'ORGANIZATION', 'WORKFLOW'];
