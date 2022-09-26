import {
    COMMON_REPORTS_URL,
    LOOKUPS_URL,
    COMMON_ACCOUNT_URL,
    STOCK_AGENT_PRICE_URL,
    STOCK_AGENT_URL,
    STOCK_ARTICLES_URL,
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
    docInfoRoutes, STOCK_ARTICLES_STORE_URL, STOCK_ANOMALY_URL, STOCK_REPORTS_URL, DASHBOARD_URL
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
import { AgentPriceDetailComponent, AgentPriceListComponent } from '@ss/logistics/ui-agent-price';
import { CostCenterDetailComponent, CostCenterListComponent } from '@ss/logistics/ui-cost-center';
import { InventoryEntryDetailComponent, InventoryEntryListComponent } from '@ss/stock/ui-inventory-entry';
import { InventoryEntryLinesDetailComponent } from '@ss/stock/ui-inventory-entry-lines';
import { InventoryExitDetailComponent, InventoryExitListComponent } from '@ss/stock/ui-inventory-exit';
import { InventoryExitLinesDetailComponent } from '@ss/stock/ui-inventory-exit-lines';
import { ConsumptionDetailComponent, ConsumptionListComponent } from '@ss/stock/ui-consumption';
import { ConsumptionLinesDetailComponent } from '@ss/stock/ui-consumption-lines';
import { InventoryDetailComponent, InventoryListComponent } from '@ss/stock/ui-inventory';
import { InventoryLinesDetailComponent } from '@ss/stock/ui-inventory-lines';
import { ReportViewComponent } from '@ss/common/ui-report-param';
import {ArticleStoreAssignmentComponent} from '@ss/stock/ui-article-store-assignment';
import {InventoryAnomaliesComponent} from '@ss/stock/ui-inventory-anomalies';
import {DashboardComponent} from '@ss/dashboard';

export const mainRoutes: Routes = [
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [CanActivateService],
    },
    {
        path: STOCK_ANOMALY_URL,
        component: InventoryAnomaliesComponent,
        canActivate: [CanActivateService],
    },
    {
        path: STOCK_ARTICLES_STORE_URL,
        component: ArticleStoreAssignmentComponent,
        canActivate: [CanActivateService],
    },
    {
        path: STOCK_ARTICLES_URL,
        children: [
            {
                path: LIST_URL,
                component: ArticleListComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ArticleDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: InventoryLinesDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InventoryDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: InventoryEntryLinesDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InventoryEntryDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: InventoryExitLinesDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InventoryExitDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: ConsumptionLinesDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ConsumptionDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + '/:id',
                component: InventoryLinesDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InventoryDetailComponent,
                canActivate: [CanActivateService],
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
                children: docInfoRoutes,
                canActivate: [CanActivateService],
                data: { form: 'Agent' }
            },
            {
                path: ':id',
                component: AgentDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService],
                children: [
                    {
                        path: 'archive',
                        children: [
                            {path: '', component: AppArchiveListComponent, pathMatch: 'full' },
                            {path: ':id', component: AppArchiveDetailComponent},
                        ]
                    }
                ]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: COMMON_ACCOUNT_URL,
        children: [
            {
                path: LIST_URL,
                component: AccountListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AccountDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_AGENT_PRICE_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentPriceListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AgentPriceDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: STOCK_COST_CENTER_URL,
        children: [
            {
                path: LIST_URL,
                component: CostCenterListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CostCenterDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            { path: '', redirectTo: LIST_URL, pathMatch: 'full' },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./stock-lookups.module').then(m => m.StockLookupsModule)
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];

export const lookupRoutes: Routes = [
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
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: COMMON_REPORTS_URL,
        data: {reportBase: 'stock'},
        component: ReportViewComponent,
        canActivate: [CanActivateService]
    },
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
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
];

