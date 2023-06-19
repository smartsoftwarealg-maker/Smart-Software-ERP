import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { parkRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(parkRoutes)
    ]
})
export class ParkModule { }
