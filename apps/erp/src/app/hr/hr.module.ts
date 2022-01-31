import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './routes';
import { PayrollUiEmployeeModule } from '@ss/payroll/ui-employee';

@NgModule({
    imports: [
        PayrollUiEmployeeModule,
        RouterModule.forChild(mainRoutes)
    ]
})
export class HRModule { }
