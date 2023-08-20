import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ssalesRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(ssalesRoutes)
    ]
})
export class ServiceSalesModule { }
