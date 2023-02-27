import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { hrRoutes } from './routes';
import { PayrollUiEmployeeModule } from '@ss/payroll/ui-employee';

@NgModule({
    imports: [
        PayrollUiEmployeeModule,
        RouterModule.forChild(hrRoutes)
    ]
})
export class HRModule { }
