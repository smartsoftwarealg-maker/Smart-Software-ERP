import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {dashboardRoutes} from './routes';


@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
})
export class AppDashboardModule {}
