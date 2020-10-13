import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './routes';
import {PayrollUiPersonModule} from '@ss/payroll/ui-person';

@NgModule({
    imports: [
        PayrollUiPersonModule,
        RouterModule.forChild(mainRoutes)
    ]
})
export class PayrollModule {}
