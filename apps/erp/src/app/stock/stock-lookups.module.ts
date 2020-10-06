import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    StockUiLookupModule
} from '@ss/stock/ui-lookup';
import {CommonUiLookupModule} from '@ss/common/ui-lookup';
import {lookupRoutes} from './routes';

@NgModule({
    imports: [
        StockUiLookupModule,
        CommonUiLookupModule,
        RouterModule.forChild(lookupRoutes)
    ]
})
export class StockLookupsModule {
}
