import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
    PayrollUiLookupModule,
} from '@ss/payroll/ui-lookup';
import {lookupRoutes} from './routes';


@NgModule({
    imports: [
        PayrollUiLookupModule,
        RouterModule.forChild(lookupRoutes)
    ]
})
export class PayrollLookupsModule {
}
