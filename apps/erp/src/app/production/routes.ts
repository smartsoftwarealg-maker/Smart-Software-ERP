import { Routes } from '@angular/router';
import {
    ABS_INDEX_URL,
    LIST_URL,
    CanDeactivateService,
} from '@ss/common/api-common';
import {
    docInfoRoutes,
    PRODUCTION_ORDER_URL,
    PRODUCTIONS_URL,
    PRODUCTION_MRP_URL,
    PRODUCTION_BOM_URL,
    PRODUCTION_ARTICLE_URL, PRODUCTION_LOT_MANAGEMENT_URL, PRODUCTION_LOT_ANALYSIS_URL
} from '../common';
import {
    ProductionOrderDetailComponent,
    ProductionOrderLinesDetailComponent,
    ProductionOrderLinesListComponent,
    ProductionOrderListComponent,
} from '@ss/production/production-order';

import {
    ProductionDetailComponent,
    ProductionLinesDetailComponent,
    ProductionLinesListComponent,
    ProductionListComponent,
} from '@ss/production/production';
import { loginGuard } from '../erp-guards';
import { MrpComponent } from '@ss/production/mrp';
import { BomComponent } from '@ss/master-data/ui-article';
import { ProductionArticleDetailComponent, ProductionArticleListComponent } from '@ss/production/production-article';
import {
    LotAnalysisDetailComponent,
    LotAnalysisListComponent,
    LotManagementDetailComponent,
    LotManagementListComponent
} from '@ss/production/lot';

export const prodRoutes: Routes = [
    {
        path:PRODUCTION_MRP_URL,
        component: MrpComponent,
    },
    {
        path:PRODUCTION_BOM_URL,
        component:BomComponent,
    },
    {
        path: PRODUCTION_ORDER_URL,
        children: [
            {
                path: LIST_URL,
                component: ProductionOrderListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes,
            },

            {
                path: ':id',
                component: ProductionOrderDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    {
                        path: 'lines-list',
                        component: ProductionOrderLinesListComponent,
                        children: docInfoRoutes,
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            {
                                path: ':id',
                                component: ProductionOrderLinesDetailComponent,
                            },
                        ],
                    },
                    ...docInfoRoutes,
                ],
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
        ],
    },
    {
        path: PRODUCTIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: ProductionListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: ProductionDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    {
                        path: 'lines-list',
                        component: ProductionLinesListComponent,
                        children: docInfoRoutes,
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            {
                                path: ':id',
                                component: ProductionLinesDetailComponent,
                            },
                        ],
                    },
                    ...docInfoRoutes,
                ],
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
        ],
    },
    {
        path: PRODUCTION_ARTICLE_URL,
        children: [
            {
                path: LIST_URL,
                component: ProductionArticleListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: ProductionArticleDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
        ],
    },
    {
        path: PRODUCTION_LOT_MANAGEMENT_URL,
        children: [
            {
                path: LIST_URL,
                component: LotManagementListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: LotManagementDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
        ],
    },
    {
        path: PRODUCTION_LOT_ANALYSIS_URL,
        children: [
            {
                path: LIST_URL,
                component: LotAnalysisListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: LotAnalysisDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
        ],
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
];
