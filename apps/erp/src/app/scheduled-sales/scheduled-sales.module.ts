import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {schedSalesRoutes} from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(schedSalesRoutes)
    ]
})
export class ScheduledSalesModule {
    constructor() {
    }
}
