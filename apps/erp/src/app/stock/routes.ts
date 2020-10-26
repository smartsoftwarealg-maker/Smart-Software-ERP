import {
    LOOKUPS_URL,
    STOCK_ARTICLES_URL,
    STOCK_CLASSES_URL,
    STOCK_MARKS_URL,
    STOCK_STORE_NAMES_URL,
    STOCK_SUBCLASSES_URL,
    STOCK_UNITS_URL,
    COMMON_VAT_URL
} from '../constants';
import {
    LIST_URL,
    DETAIL_URL,
    CanActivateService,
    ABS_INDEX_URL
} from '@ss/common/api-common';
import {ArticleDetailComponent, ArticleListComponent} from '@ss/stock/ui-article';
import {Routes} from '@angular/router';
import {
    StoreNameListComponent,
    StoreNameDetailComponent,
    MarkListComponent,
    MarkDetailComponent,
    UnitListComponent,
    UnitDetailComponent,
    SubclassListComponent,
    SubclassDetailComponent,
    ClassListComponent,
    ClassDetailComponent,
} from '@ss/common/ui-lookup';
import {VatDetailComponent, VatListComponent} from '@ss/common/ui-lookup';

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
        path: COMMON_VAT_URL,
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
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
];
