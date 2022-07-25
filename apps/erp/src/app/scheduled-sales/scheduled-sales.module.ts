import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {salesRoutes} from './routes';
import {PayMethodService} from '@ss/logistics/api-logistics-common';

@NgModule({
    imports: [
        RouterModule.forChild(salesRoutes)
    ]
})
export class ScheduledSalesModule {
    constructor(private payMethod: PayMethodService) {
        this.payMethod.load();
    }
}
