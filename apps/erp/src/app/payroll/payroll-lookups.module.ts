import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
    PayrollUiLookupModule
} from '@ss/payroll/ui-lookup';
import {
    CommonUiLookupModule
} from '@ss/common/ui-lookup';
import {lookupRoutes} from './routes';


@NgModule({
    imports: [
        PayrollUiLookupModule,
        CommonUiLookupModule,
        RouterModule.forChild(lookupRoutes)
    ]
})
export class PayrollLookupsModule {
}
