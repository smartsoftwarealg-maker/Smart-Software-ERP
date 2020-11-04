import {
    LOOKUPS_URL,
    STOCK_ACTIVITY_URL,
    STOCK_AGENT_TYPE_URL,
    STOCK_AGENT_URL,
    STOCK_ARTICLES_URL,
    STOCK_CITY_URL,
    STOCK_CLASSES_URL,
    STOCK_COMPANY_TYPE_URL,
    STOCK_COUNTRY_URL,
    STOCK_CURRENCY_URL,
    STOCK_MARKS_URL,
    STOCK_PAY_MODE_URL,
    STOCK_STORE_NAMES_URL,
    STOCK_SUBCLASSES_URL,
    STOCK_UNITS_URL,
    STOCK_VAT_URL
} from '../constants';
import {ABS_INDEX_URL, CanActivateService, DETAIL_URL, LIST_URL} from '@ss/common/api-common';
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
                canActivate: [CanActivateService]
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
