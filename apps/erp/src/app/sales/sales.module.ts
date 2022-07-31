import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {mainRoutes} from './routes';
import {PayMethodService} from '@ss/logistics/api-logistics-common';

@NgModule({
    imports: [
        RouterModule.forChild(mainRoutes)
    ]
})
export class SalesModule {
    constructor() {
    }
}
