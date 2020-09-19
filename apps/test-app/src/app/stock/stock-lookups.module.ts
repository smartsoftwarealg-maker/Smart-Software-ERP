import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {STOCK_CLASSES_URL, STOCK_MARKS_URL, STOCK_SUBCLASSES_URL, STOCK_VAT_URL} from '../constants';
import { DETAIL_URL, LIST_URL } from '@ss/common/api-common';
import { MarkListComponent, MarkDetailComponent, StockUiMarkModule } from '@ss/stock/ui-mark';
import {ABS_INDEX_URL} from '@ss/common/api-common';
import {VatDetailComponent, VatListComponent, StockUiVatModule} from '@ss/stock/ui-vat';
import {ClassDetailComponent, ClassListComponent} from '@ss/stock/ui-class';
import {SubclassDetailComponent, SubclassListComponent} from '@ss/stock/ui-subclass';


const routes: Routes = [
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
                path: DETAIL_URL,
                component: ClassDetailComponent
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
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
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
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
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];

@NgModule({
    imports: [
        StockUiMarkModule,
        StockUiVatModule,
        RouterModule.forChild(routes)
    ]
})
export class StockLookupsModule {
}
