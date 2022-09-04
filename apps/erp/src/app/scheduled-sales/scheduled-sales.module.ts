import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
