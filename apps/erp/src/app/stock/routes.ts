import {
    COMMON_REPORTS_URL,
    LOOKUPS_URL,
    COMMON_ACCOUNT_URL,
    STOCK_AGENT_PRICE_URL,
    STOCK_AGENT_URL,
    LOGISTICS_ARTICLES_URL,
    STOCK_CLASSES_URL,
    STOCK_CONSUMPTION_URL,
    STOCK_COST_CENTER_URL,
    STOCK_INVENTORY_ENTRY_URL,
    STOCK_INVENTORY_EXIT_URL,
    STOCK_INVENTORY_URL,
    COMMON_MARKS_URL,
    STOCK_STORE_NAMES_URL,
    STOCK_SUBCLASSES_URL,
    STOCK_UNITS_URL,
    docInfoRoutes,
    STOCK_ARTICLES_STORE_URL,
    STOCK_ANOMALY_URL,
    STOCK_REPORTS_URL,
    DASHBOARD_URL,
    STOCK_TRANSFER_URL,
    STOCK_TRANSFER_RECEPTION_URL,
    USER_STORES_URL,
    STOCK_ARTICLE_URL,
    GENERATION_ACCOUNT_URL,
    STOCK_ACCOUNT_URL, STOCK_PRICE_RECALCULATION_URL
} from '../common';
import { ABS_INDEX_URL, CanActivateService, LINES_DETAIL_URL, LIST_URL, CanDeactivateService } from '@ss/common/api-common';
import { ArticleDetailComponent, ArticleListComponent } from '@ss/stock/ui-article';
import { Routes } from '@angular/router';
import {
    ClassDetailComponent,
    ClassListComponent,
    MarkDetailComponent,
    MarkListComponent,
    StoreNameDetailComponent,
    StoreNameListComponent,
    SubclassDetailComponent,
    SubclassListComponent,
    UnitDetailComponent,
    UnitListComponent,
} from '@ss/common/ui-lookup';
import {
    AgentListComponent,
    AgentDetailComponent,
    AppArchiveListComponent,
    AppArchiveDetailComponent
} from '@ss/logistics/ui-agent';
import { AccountDetailComponent, AccountListComponent } from '@ss/logistics/ui-account';
import { CostCenterDetailComponent, CostCenterListComponent } from '@ss/logistics/ui-cost-center';
import { InventoryEntryDetailComponent, InventoryEntryListComponent } from '@ss/stock/ui-inventory-entry';
import { InventoryEntryLinesDetailComponent } from '@ss/stock/ui-inventory-entry-lines';
import { InventoryExitDetailComponent, InventoryExitListComponent } from '@ss/stock/ui-inventory-exit';
import { InventoryExitLinesDetailComponent } from '@ss/stock/ui-inventory-exit-lines';
import { ConsumptionDetailComponent, ConsumptionListComponent } from '@ss/stock/ui-consumption';
import { ConsumptionLinesDetailComponent } from '@ss/stock/ui-consumption-lines';
import {InventoryDetailComponent, InventoryListComponent, PriceRecalculationComponent} from '@ss/stock/ui-inventory';
import { InventoryLinesDetailComponent } from '@ss/stock/ui-inventory-lines';
import { ReportViewComponent } from '@ss/common/ui-report-param';
import {ArticleStoreAssignmentComponent} from '@ss/stock/ui-article-store-assignment';
import {InventoryAnomaliesComponent} from '@ss/stock/ui-inventory-anomalies';
import {DashboardComponent} from '@ss/dashboard';
import {
    InventoryTransferDetailComponent,
    InventoryTransferLinesDetailComponent,
    InventoryTransferListComponent,
    TransferReceptionDetailComponent,
    TransferReceptionLinesDetailComponent,
    TransferReceptionListComponent
} from '@ss/stock/inventory-transfers';
import {UserStoresComponent} from '@ss/stock/ui-store';
import {
    GenerationAccountsDetailComponent,
    GenerationAccountsListComponent, TransacAccountsDetailComponent, TransacAccountsListComponent
} from '@ss/accounting/accounting-accounts';
import {loginGuard} from '../erp-guards';

export const mainRoutes: Routes = [
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [loginGuard],
    },
    {
        path: STOCK_ANOMALY_URL,
        component: InventoryAnomaliesComponent,
        canActivate: [loginGuard],
    },
    {
        path: STOCK_ARTICLES_STORE_URL,
        component: ArticleStoreAssignmentComponent,
        canActivate: [loginGuard],
    },
    {
        path: USER_STORES_URL,
        component: UserStoresComponent,
        canActivate: [loginGuard],
    },
    {
        path: STOCK_ARTICLE_URL,
        children: [
            {
                path: LIST_URL,
                component: ArticleListComponent,
                canActivate: [loginGuard],
                data: { price: 'awp' },
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ArticleDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: GENERATION_ACCOUNT_URL,
        children: [
            {
                path: LIST_URL,
                component: TransacAccountsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: TransacAccountsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: STOCK_ACCOUNT_URL,
        children: [
            {
                path: LIST_URL,
                component: GenerationAccountsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: GenerationAccountsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: STOCK_INVENTORY_URL,
        children: [
            {
                path: LIST_URL,
                component: InventoryListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: InventoryLinesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InventoryDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_INVENTORY_ENTRY_URL,
        children: [
            {
                path: LIST_URL,
                component: InventoryEntryListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: InventoryEntryLinesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InventoryEntryDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_INVENTORY_EXIT_URL,
        children: [
            {
                path: LIST_URL,
                component: InventoryExitListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: InventoryExitLinesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InventoryExitDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_TRANSFER_URL,
        children: [
            {
                path: LIST_URL,
                component: InventoryTransferListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: InventoryTransferLinesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InventoryTransferDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_TRANSFER_RECEPTION_URL,
        children: [
            {
                path: LIST_URL,
                component: TransferReceptionListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: TransferReceptionLinesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: TransferReceptionDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_CONSUMPTION_URL,
        children: [
            {
                path: LIST_URL,
                component: ConsumptionListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: ConsumptionLinesDetailComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ConsumptionDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_INVENTORY_URL,
        children: [
            {
                path: LIST_URL,
                component: InventoryListComponent,
                canActivate: [loginGuard],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: InventoryLinesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InventoryDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_AGENT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: AgentDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        data: {sales: true},
                        children: [
                            {
                                path: 'archive',
                                children: [
                                    {path: '', component: AppArchiveListComponent, pathMatch: 'full' },
                                    {path: ':id', component: AppArchiveDetailComponent},
                                ]
                            }
                        ]
                    }
                ]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: COMMON_ACCOUNT_URL,
        children: [
            {
                path: LIST_URL,
                component: AccountListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AccountDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    // {
    //     path: STOCK_AGENT_PRICE_URL,
    //     children: [
    //         {
    //             path: LIST_URL,
    //             component: AgentPriceListComponent,
    //             canActivate: [loginGuard]
    //         },
    //         {
    //             path: ':id',
    //             component: AgentPriceDetailComponent,
    //             canActivate: [loginGuard],
    //             canDeactivate: [CanDeactivateService]
    //         },
    //         { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
    //         { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
    //     ]
    // },
    {
        path: STOCK_COST_CENTER_URL,
        children: [
            {
                path: LIST_URL,
                component: CostCenterListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CostCenterDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_REPORTS_URL,
        children: [
            {
                path: LIST_URL,
                data: { reportBase: 'stock'},
                component: ReportViewComponent,
                canActivate: [loginGuard]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_STORE_NAMES_URL,
        children: [
            {
                path: LIST_URL,
                component: StoreNameListComponent
            },
            {
                path: ':id',
                component: StoreNameDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_UNITS_URL,
        children: [
            {
                path: LIST_URL,
                component: UnitListComponent
            },
            {
                path: ':id',
                component: UnitDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: COMMON_MARKS_URL,
        children: [
            {
                path: LIST_URL,
                component: MarkListComponent
            },
            {
                path: ':id',
                component: MarkDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_CLASSES_URL,
        children: [
            {
                path: LIST_URL,
                component: ClassListComponent
            },
            {
                path: ':id',
                component: ClassDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    // {
    //     path: COMMON_REPORTS_URL,
    //     data: {reportBase: 'stock'},
    //     component: ReportViewComponent,
    //     canActivate: [loginGuard]
    // },
    {
        path: STOCK_SUBCLASSES_URL,
        children: [
            {
                path: LIST_URL,
                component: SubclassListComponent
            },
            {
                path: ':id',
                component: SubclassDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    { path: STOCK_PRICE_RECALCULATION_URL, component: PriceRecalculationComponent, canActivate: [loginGuard]},

    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];

