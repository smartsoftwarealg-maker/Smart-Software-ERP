import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {lookupRoutes} from './routes';


@NgModule({
    imports: [

        RouterModule.forChild(lookupRoutes)
    ]
})
export class ExchangeLookupsModule {
}
