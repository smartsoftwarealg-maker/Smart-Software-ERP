import {
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
    STOCK_RECEPTION_URL,
    STOCK_STORE_NAMES_URL,
    STOCK_SUBCLASSES_URL,
    STOCK_UNITS_URL,
    STOCK_VAT_URL
} from '../constants';
import {ABS_INDEX_URL, CanActivateService, DETAIL_URL, LINES_DETAIL_URL, LIST_URL} from '@ss/common/api-common';
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
import {InventoryEntryLinesDetailComponent, InventoryEntryLinesListComponent} from "@ss/stock/ui-inventory-entry-lines";
import {InventoryExitDetailComponent, InventoryExitListComponent} from "@ss/stock/ui-inventory-exit";
import {InventoryExitLinesDetailComponent, InventoryExitLinesListComponent} from "@ss/stock/ui-inventory-exit-lines";
import {ConsumptionDetailComponent, ConsumptionListComponent} from "@ss/stock/ui-consumption";
import {ConsumptionLinesDetailComponent, ConsumptionLinesListComponent} from "@ss/stock/ui-consumption-lines";
import {InventoryDetailComponent, InventoryListComponent} from "@ss/stock/ui-inventory";
import {InventoryLinesDetailComponent, InventoryLinesListComponent} from "@ss/stock/ui-inventory-lines";
import {ReceptionDetailComponent, ReceptionListComponent} from "@ss/stock/ui-reception";
import {ReceptionLinesDetailComponent, ReceptionLinesListComponent} from "@ss/stock/ui-reception-lines";
import {CirculationComponent} from "@ss/stock/ui-circulation";
import {CardComponent} from "@ss/stock/ui-card";


export const mainRoutes: Routes = [
    {
        path: STOCK_ARTICLES_URL,
        children: [
            {
                path: LIST_URL,
                component: ArticleListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: DETAIL_URL,
                component: ArticleDetailComponent,
                canActivate: [CanActivateService],
                children: [
                    {
                        path: 'circulations',
                        component: CirculationComponent,
                        canActivate: [CanActivateService]
                    },
                    {
                        path: 'cards',
                        component: CardComponent,
                        canActivate: [CanActivateService]
                    },
                    {
                        path: '',
                        redirectTo: 'circulations',
                        pathMatch: 'full'
                    },
                    {
                        path: '**',
                        redirectTo: 'circulations',
                        pathMatch: 'full'
                    }
                ]
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
                canActivate: [CanActivateService]
            },
            {
                path: LINES_DETAIL_URL,
                component: InventoryEntryLinesDetailComponent,
                canActivate: [CanActivateService]
            },
            {
                path: DETAIL_URL,
                component: InventoryEntryDetailComponent,
                canActivate: [CanActivateService],
                children: [
                    {
                        path: '',
                        component: InventoryEntryLinesListComponent,
                        canActivate: [CanActivateService]
                    }
                ]
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
                canActivate: [CanActivateService]
            },
            {
                path: LINES_DETAIL_URL,
                component: InventoryExitLinesDetailComponent,
                canActivate: [CanActivateService]
            },
            {
                path: DETAIL_URL,
                component: InventoryExitDetailComponent,
                canActivate: [CanActivateService],
                children: [
                    {
                        path: '',
                        component: InventoryExitLinesListComponent,
                        canActivate: [CanActivateService]
                    }
                ]
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
                canActivate: [CanActivateService]
            },
            {
                path: LINES_DETAIL_URL,
                component: ConsumptionLinesDetailComponent,
                canActivate: [CanActivateService]
            },
            {
                path: DETAIL_URL,
                component: ConsumptionDetailComponent,
                canActivate: [CanActivateService],
                children: [
                    {
                        path: '',
                        component: ConsumptionLinesListComponent,
                        canActivate: [CanActivateService]
                    }
                ]
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
                canActivate: [CanActivateService]
            },
            {
                path: LINES_DETAIL_URL,
                component: InventoryLinesDetailComponent,
                canActivate: [CanActivateService]
            },
            {
                path: DETAIL_URL,
                component: InventoryDetailComponent,
                canActivate: [CanActivateService],
                children: [
                    {
                        path: '',
                        component: InventoryLinesListComponent,
                        canActivate: [CanActivateService]
                    }
                ]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: STOCK_RECEPTION_URL,
        children: [
            {
                path: LIST_URL,
                component: ReceptionListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: LINES_DETAIL_URL,
                component: ReceptionLinesDetailComponent,
                canActivate: [CanActivateService]
            },
            {
                path: DETAIL_URL,
                component: ReceptionDetailComponent,
                canActivate: [CanActivateService],
                children: [
                    {
                        path: '',
                        component: ReceptionLinesListComponent,
                        canActivate: [CanActivateService]
                    }
                ]
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
                component: CostCenterDetailComponent,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
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
                path: DETAIL_URL,
                component: ActivityDetailComponent
            },
            {path: '**', redirectTo: LIST_URL, pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
