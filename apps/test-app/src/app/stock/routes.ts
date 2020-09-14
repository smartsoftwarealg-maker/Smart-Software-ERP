import {LOOKUPS_URL, STOCK_ARTICLE_URL, ABS_STOCK_MARKS_URL, ABS_STOCK_ARTICLES_URL} from '../constants';
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
        path: STOCK_ARTICLE_URL,
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
            icon: 'fas fa-file',
            children: [
                {
                    name: 'STOCK_MARKS',
                    icon: 'fas fa-copyright',
                    route: ABS_STOCK_MARKS_URL
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
