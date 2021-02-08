import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {lookupRoutes} from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(lookupRoutes)
    ]
})
export class SalesLookupsModule {
}
