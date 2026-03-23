import { Routes } from '@angular/router';
import {
    ABS_INDEX_URL,
    LIST_URL,
    CanDeactivateService,
} from '@ss/common/api-common';
import {
    docInfoRoutes,
    PRODUCTION_ORDER_URL,
    PRODUCTION_MRP_URL,
    PRODUCTION_BOM_URL,
    PRODUCTION_ARTICLE_URL,
    PRODUCTION_LOT_MANAGEMENT_URL,
    PRODUCTION_LOT_ANALYSIS_URL,
    PRODUCTION_INTER_STORE_TRANSFER_URL,
    PRODUCTION_UNLOCKING_LOTS_URL,
    PRODUCTION_ARTICLE_TYPES_URL,
    PRODUCTION_DOSAGE_UNITS_URL,
    PRODUCTION_PACKAGING_UNITS_URL,
    COMMON_REPORTS_URL,
    PRODUCTIONS_TRANSFER_URL,
    PRODUCTION_CONSUMPTION_URL,
    PRODUCTION_TRANSFER_DETAIL_URL,
    PRODUCTION_FORMULAS_URL,
    PRODUCTIONS_URL,
    STOCK_RESERVATIONS_URL,
    PRODUCTIONS_RESERVATION_URL,
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
import { MrpComponent, ProductionConsumptionComponent } from '@ss/production/mrp';
import { Bom2DetailComponent, Bom2ListComponent } from '@ss/master-data/ui-article';
import {
    ArticleTypeDetailComponent,
    ArticleTypeListComponent,
    DosageUnitsDetailComponent,
    DosageUnitsListComponent,
    PackagingUnitsDetailComponent,
    PackagingUnitsListComponent,
    ProductionArticleDetailComponent,
    ProductionArticleListComponent,
} from '@ss/production/production-article';
import {
    LotAnalysisDetailComponent,
    LotAnalysisListComponent,
    LotManagementDetailComponent,
    LotManagementListComponent, UnlockingLotsComponent
} from '@ss/production/lot';
import {
    InterStoreTransferListComponent,
    InterStoreTransferDetailComponent,
    InterStoreTransferLinesListComponent,
    InterStoreTransferLinesDetailComponent,
} from '@ss/production/production-reception';
import { ReportViewComponent } from '@ss/common/ui-report-param';
import {
    ProductionTransferDetailComponent,
    ProductionTransferLinesListComponent,
    ProductionTransferListComponent,
    ProductionTransferLinesDetailComponent,

} from '@ss/production/production-transfer';
import {
    ProductionConsumptionDetailComponent,
    ProductionConsumptionLinesDetailComponent,
    ProductionConsumptionLinesListComponent,
    ProductionConsumptionListComponent,
} from '@ss/production/production-consumption';
import {
    ProductionFormulasDetailComponent,
    ProductionFormulasLinesDetailComponent,
    ProductionFormulasLinesListComponent,
    ProductionFormulasListComponent,
} from '@ss/production/production-formulas';
import { PartsReservationDetailComponent,
    PartsReservationLineDetailComponent, PartsReservationLineListComponent, PartsReservationListComponent } from '@logistics/parts-reservation';
import {
    ProductionReservationLinesDetailComponent,
    ProductionReservationListComponent,
} from '@ss/production/production-reservation';
import {
    ProductionReservationDetailComponent
} from '@ss/production/production-reservation';
import {
    ProductionReservationLineListComponent
} from '@ss/production/production-reservation';

export const prodRoutes: Routes = [
    {
        path: PRODUCTION_MRP_URL,
        component: MrpComponent,
    },
    {
        path: PRODUCTION_INTER_STORE_TRANSFER_URL,
        children: [
            {
                path: LIST_URL,
                component: InterStoreTransferListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: InterStoreTransferDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-detail' },
                    {
                        path: 'lines-detail',
                        component: InterStoreTransferLinesListComponent,
                        children: docInfoRoutes,
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            {
                                path: ':id',
                                component:
                                    InterStoreTransferLinesDetailComponent,
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
        path: STOCK_RESERVATIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: PartsReservationListComponent,
                canActivate: [loginGuard],
                canActivateChild: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: PartsReservationDetailComponent,
                canActivate: [loginGuard],
                canActivateChild: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    {
                        path: 'lines-list',
                        component: PartsReservationLineListComponent,
                        children: docInfoRoutes,
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            {
                                path: ':id',
                                component: PartsReservationLineDetailComponent,
                            },
                        ],
                    },
                    ...docInfoRoutes,
                ],
            },
        ],
    },

    {
        path: PRODUCTION_BOM_URL,
        children: [
            {
                path: LIST_URL,
                component: Bom2ListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: Bom2DetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
        ],
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
                        children: [
                            ...docInfoRoutes,
                            {
                                path: 'consumptions',
                                component: ProductionConsumptionComponent,
                            },
                        ],
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
                        children: [
                            ...docInfoRoutes,
                            {
                                path: 'consumptions',
                                component: ProductionConsumptionComponent,
                            },
                        ],
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
        path: PRODUCTION_FORMULAS_URL,
        children: [
            {
                path: LIST_URL,
                component: ProductionFormulasListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: ProductionFormulasDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    {
                        path: 'lines-list',
                        component: ProductionFormulasLinesListComponent,
                        children: [
                            ...docInfoRoutes,
                            {
                                path: 'consumptions',
                                component: ProductionConsumptionComponent,
                            },
                        ],
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            {
                                path: ':id',
                                component:
                                    ProductionFormulasLinesDetailComponent,
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
    {
        path: PRODUCTION_ARTICLE_TYPES_URL,
        children: [
            {
                path: LIST_URL,
                component: ArticleTypeListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: ArticleTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
        ],
    },
    {
        path: PRODUCTION_DOSAGE_UNITS_URL,
        children: [
            {
                path: LIST_URL,
                component: DosageUnitsListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: DosageUnitsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
        ],
    },
    {
        path: PRODUCTION_PACKAGING_UNITS_URL,
        children: [
            {
                path: LIST_URL,
                component: PackagingUnitsListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: PackagingUnitsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
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
                        children: [
                            ...docInfoRoutes,
                            {
                                path: 'consumptions',
                                component: ProductionConsumptionComponent,
                            },
                        ],
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
        path: COMMON_REPORTS_URL,
        component: ReportViewComponent,
        canActivate: [loginGuard],
        data: { reportBase: 'manuf' },
    },
    {
        path: PRODUCTION_UNLOCKING_LOTS_URL,
        component: UnlockingLotsComponent,
        canActivate: [loginGuard],
    },
    {
        path: PRODUCTIONS_TRANSFER_URL,
        children: [
            {
                path: LIST_URL,
                component: ProductionTransferListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: ProductionTransferDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    {
                        path: 'lines-list',
                        component: ProductionTransferLinesListComponent,
                        children: [
                            ...docInfoRoutes,
                            {
                                path: 'consumptions',
                                component: ProductionConsumptionComponent,
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
        path: PRODUCTIONS_RESERVATION_URL,
        children: [
            {
                path: LIST_URL,
                component: ProductionReservationListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: ProductionReservationDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    {
                        path: 'lines-list',
                        component: ProductionReservationLineListComponent,
                        children: docInfoRoutes,
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            {
                                path: ':id',
                                component: ProductionReservationLinesDetailComponent,
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
        path: PRODUCTION_CONSUMPTION_URL,
        children: [
            {
                path: LIST_URL,
                component: ProductionConsumptionListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: ProductionConsumptionDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    {
                        path: 'lines-list',
                        component: ProductionConsumptionLinesListComponent,
                        children: docInfoRoutes,
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            {
                                path: ':id',
                                component:
                                    ProductionConsumptionLinesDetailComponent,
                            },
                        ],
                    },
                    ...docInfoRoutes,
                ],
            },
        ],
    },
    {
        path: PRODUCTION_TRANSFER_DETAIL_URL,
        children: [
            {
                path: LIST_URL,
                component: ProductionTransferListComponent,
                canActivate: [loginGuard],
                canActivateChild: [loginGuard],
                children: docInfoRoutes,
            },
            {
                path: ':id',
                component: ProductionTransferDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                canActivateChild: [loginGuard],
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'lines-list' },
                    {
                        path: 'lines-list',
                        component: ProductionTransferLinesListComponent,
                        children: docInfoRoutes,
                    },
                    {
                        path: 'lines-detail',
                        children: [
                            {
                                path: ':id',
                                component:
                                    ProductionTransferLinesDetailComponent,
                            },
                        ],
                    },
                    ...docInfoRoutes,
                ],
            },
        ],
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
];
