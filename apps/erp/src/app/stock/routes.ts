import {
    COMMON_REPORT_PARAMS_URL,
    LOOKUPS_URL,
    STOCK_ACCOUNT_URL,
    STOCK_ACTIVITY_URL,
    STOCK_AGENT_PRICE_URL,
    STOCK_AGENT_TYPE_URL,
    STOCK_AGENT_URL,
    STOCK_ARTICLES_URL,
    STOCK_CITY_URL,
    STOCK_CLASSES_URL,
    STOCK_COMPANY_TYPE_URL,
    STOCK_CONSUMPTION_URL,
    STOCK_COST_CENTER_URL,
    STOCK_COUNTRY_URL,
    STOCK_CURRENCY_URL,
    STOCK_INVENTORY_ENTRY_URL,
    STOCK_INVENTORY_EXIT_URL,
    STOCK_INVENTORY_URL,
    STOCK_MARKS_URL,
    STOCK_PAY_MODE_URL,
    STOCK_STORE_NAMES_URL,
    STOCK_SUBCLASSES_URL,
    STOCK_UNITS_URL,
    STOCK_VAT_URL
} from '../constants';
import {ABS_INDEX_URL, CanActivateService, LINES_DETAIL_URL, LIST_URL} from '@ss/common/api-common';
import {ArticleDetailComponent, ArticleListComponent} from '@ss/stock/ui-article';
import {Routes} from '@angular/router';
import {
    ActivityDetailComponent,
    ActivityListComponent,
    AgentTypeDetailComponent,
    AgentTypeListComponent,
    CityDetailComponent,
    CityListComponent,
    ClassDetailComponent,
    ClassListComponent,
    CompanyTypeDetailComponent,
    CompanyTypeListComponent,
    CountryDetailComponent,
    CountryListComponent,
    CurrencyDetailComponent,
    CurrencyListComponent,
    MarkDetailComponent,
    MarkListComponent,
    PayModeDetailComponent,
    PayModeListComponent,
    StoreNameDetailComponent,
    StoreNameListComponent,
    SubclassDetailComponent,
    SubclassListComponent,
    UnitDetailComponent,
    UnitListComponent,
    VatDetailComponent,
    VatListComponent,
} from '@ss/common/ui-lookup';
import {AgentDetailComponent, AgentListComponent} from "@ss/logistics/ui-agent";
import {AccountDetailComponent, AccountListComponent} from "@ss/logistics/ui-account";
import {AgentPriceDetailComponent, AgentPriceListComponent} from "@ss/logistics/ui-agent-price";
import {CostCenterDetailComponent, CostCenterListComponent} from "@ss/logistics/ui-cost-center";
import {InventoryEntryDetailComponent, InventoryEntryListComponent} from "@ss/stock/ui-inventory-entry";
import {InventoryEntryLinesDetailComponent} from "@ss/stock/ui-inventory-entry-lines";
import {InventoryExitDetailComponent, InventoryExitListComponent} from "@ss/stock/ui-inventory-exit";
import {InventoryExitLinesDetailComponent} from "@ss/stock/ui-inventory-exit-lines";
import {ConsumptionDetailComponent, ConsumptionListComponent} from "@ss/stock/ui-consumption";
import {ConsumptionLinesDetailComponent} from "@ss/stock/ui-consumption-lines";
import {InventoryDetailComponent, InventoryListComponent} from "@ss/stock/ui-inventory";
import {InventoryLinesDetailComponent} from "@ss/stock/ui-inventory-lines";
import {ReportParamsComponent} from "@ss/common/ui-report-param";
import {docInfoRoutes} from "../administration/routes";


export const mainRoutes: Routes = [
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
                children: docInfoRoutes
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
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
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InventoryEntryDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
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
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InventoryExitDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
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
                path: LINES_DETAIL_URL + "/:id",
                component: ConsumptionLinesDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: ConsumptionDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
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
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: LINES_DETAIL_URL + "/:id",
                component: InventoryLinesDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {
                path: ':id',
                component: InventoryDetailComponent,
                canActivate: [CanActivateService],
                children: docInfoRoutes
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: STOCK_AGENT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AgentDetailComponent,
                canActivate: [CanActivateService]
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
                component: AccountListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AccountDetailComponent,
                canActivate: [CanActivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
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
                canActivate: [CanActivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
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
                canActivate: [CanActivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: COMMON_REPORT_PARAMS_URL,
        children: [
            {
                path: LIST_URL,
                data: {reportBase: 'syscom', app: 'syscom'},
                component: ReportParamsComponent,
                canActivate: [CanActivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: LOOKUPS_URL,
        loadChildren: () => import('./stock-lookups.module').then(m => m.StockLookupsModule)
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
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
                component: StoreNameDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
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
                component: UnitDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: STOCK_MARKS_URL,
        children: [
            {
                path: LIST_URL,
                component: MarkListComponent
            },
            {
                path: ':id',
                component: MarkDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
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
                component: ClassDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
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
                component: SubclassDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: STOCK_VAT_URL,
        children: [
            {
                path: LIST_URL,
                component: VatListComponent
            },
            {
                path: ':id',
                component: VatDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: STOCK_AGENT_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentTypeListComponent
            },
            {
                path: ':id',
                component: AgentTypeDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: STOCK_COMPANY_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: CompanyTypeListComponent
            },
            {
                path: ':id',
                component: CompanyTypeDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: STOCK_PAY_MODE_URL,
        children: [
            {
                path: LIST_URL,
                component: PayModeListComponent
            },
            {
                path: ':id',
                component: PayModeDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: STOCK_CITY_URL,
        children: [
            {
                path: LIST_URL,
                component: CityListComponent
            },
            {
                path: ':id',
                component: CityDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: STOCK_CURRENCY_URL,
        children: [
            {
                path: LIST_URL,
                component: CurrencyListComponent
            },
            {
                path: ':id',
                component: CurrencyDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: STOCK_COUNTRY_URL,
        children: [
            {
                path: LIST_URL,
                component: CountryListComponent
            },
            {
                path: ':id',
                component: CountryDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {
        path: STOCK_ACTIVITY_URL,
        children: [
            {
                path: LIST_URL,
                component: ActivityListComponent
            },
            {
                path: ':id',
                component: ActivityDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
