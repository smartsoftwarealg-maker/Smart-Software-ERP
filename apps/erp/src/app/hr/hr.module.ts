import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { hrRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(hrRoutes)
    ]
})
export class HRModule { }
