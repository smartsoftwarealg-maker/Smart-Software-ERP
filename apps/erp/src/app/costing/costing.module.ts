import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { costingRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(costingRoutes)
    ]
})
export class CostingModule { }
