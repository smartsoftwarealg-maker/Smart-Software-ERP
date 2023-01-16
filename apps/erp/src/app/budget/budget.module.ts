import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {budgetRoutes} from './routes';


@NgModule({
    imports: [
        RouterModule.forChild(budgetRoutes)
    ],
})
export class BudgetModule {}
