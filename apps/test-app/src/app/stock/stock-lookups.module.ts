import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { STOCK_MARK_URL} from '../constants';
import { INDEX_PAGE_URL, DETAIL_URL, LIST_URL } from '@ss/common/api-common';
import { MarkListComponent, MarkDetailComponent, StockUiMarkModule } from '@ss/stock/ui-mark';
import {ABS_INDEX_URL} from '@ss/common/api-common';

const routes: Routes = [
    {
        path: STOCK_MARK_URL,
        children: [
            {
                path: LIST_URL,
                component: MarkListComponent
            },
            {
                path: DETAIL_URL,
                component: MarkDetailComponent
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];

@NgModule({
    imports: [
        StockUiMarkModule,
        RouterModule.forChild(routes)
    ]
})
export class StockLookupsModule {
}
