import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonUiLookupModule} from '@ss/common/ui-lookup';
import {lookupRoutes} from './routes';

@NgModule({
    imports: [
        CommonUiLookupModule,
        RouterModule.forChild(lookupRoutes)
    ]
})
export class WebArchLookupsModule {
}
