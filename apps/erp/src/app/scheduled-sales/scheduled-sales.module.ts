import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {scheduledSalesRoutes} from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(scheduledSalesRoutes)
    ]
})
export class ScheduledSalesModule {
    constructor() {
    }
}
