import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {lookupRoutes} from './routes';
import {CommonUiLookupModule} from '@ss/common/ui-lookup';

@NgModule({
    imports: [
        CommonUiLookupModule,
        RouterModule.forChild(lookupRoutes)
    ]
})
export class AdministrationLookupsModule {
}
