import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { financeRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(financeRoutes)
    ]
})
export class FinanceModule {}
