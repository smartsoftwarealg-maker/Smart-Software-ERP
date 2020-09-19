import {
    LOOKUPS_URL,
    STOCK_ARTICLES_URL,
    ABS_STOCK_MARKS_URL,
    ABS_STOCK_ARTICLES_URL,
    ABS_STOCK_VAT_URL, ABS_STOCK_CLASSES_URL, ABS_STOCK_SUBCLASSES_URL
} from '../constants';
import {
    LIST_URL,
    DETAIL_URL,
    CanActivateService,
    ABS_INDEX_URL
} from '@ss/common/api-common';
import { ArticleDetailComponent, ArticleListComponent } from '@ss/stock/ui-article';
import { Routes } from '@angular/router';
import { SideNavNode } from '@ss/common/ui-shell';

export const routes: Routes = [
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

export const stockNavTree: SideNavNode = {
    name: 'STOCK',
    icon: 'fas fa-warehouse-alt',
    children: [
        {
            name: 'STOCK_LOOKUPS',
            icon: 'fas fa-clipboard-list',
            children: [
                {
                    name: 'STOCK_MARKS',
                    icon: 'fas fa-copyright',
                    route: ABS_STOCK_MARKS_URL
                },
                {
                    name: 'STOCK_CLASSES',
                    icon: 'fas fa-copyright',
                    route: ABS_STOCK_CLASSES_URL
                },
                {
                    name: 'STOCK_SUBCLASSES',
                    icon: 'fas fa-copyright',
                    route: ABS_STOCK_SUBCLASSES_URL
                },
                {
                    name: 'STOCK_VAT',
                    icon: 'fas fa-percentage',
                    route: ABS_STOCK_VAT_URL
                }
            ]
        },
        {
            name: 'STOCK_INVENTORY',
            icon: 'fas fa-inventory',
            children: [
                {
                    name: 'STOCK_ARTICLES',
                    icon: 'fas fa-box',
                    route: ABS_STOCK_ARTICLES_URL
                }
            ]
        }
    ]
};
