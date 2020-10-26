import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonUiLookupModule} from '@ss/common/ui-lookup';
import {lookupRoutes} from './routes';

@NgModule({
    imports: [
        CommonUiLookupModule,
        RouterModule.forChild(lookupRoutes)
    ]
})
export class StockLookupsModule {
}
