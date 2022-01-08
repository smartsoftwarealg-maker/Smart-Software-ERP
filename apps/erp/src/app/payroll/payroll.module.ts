import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './routes';
import {PayrollUiEmployeeModule} from '@ss/payroll/ui-employee';
import {RemunerationElementTypesModule} from '@ss/remuneration/element-types';
import {RemunerationElementsinfoModule} from '@ss/remuneration/elementsinfo';
import {RemunerationPayrollFormulasModule} from '@ss/remuneration/payroll-formulas';
import {RemunerationPayrollMonthModule} from '@ss/remuneration/payroll-month';

@NgModule({
    imports: [
        PayrollUiEmployeeModule,
        RemunerationElementTypesModule,
        RemunerationElementsinfoModule,
        RemunerationPayrollFormulasModule,
        RemunerationPayrollMonthModule,
        RouterModule.forChild(mainRoutes)
    ]
})
export class PayrollModule {}
