import { Injectable } from '@angular/core';
import { ToolbarButton } from '@ss/common/ui-shell';
import { EmployeeActivation } from '@ss/payroll/api-person';
import { PaginationModel } from '@ss/common/ui-pagination';
import { EmployeeActivationComponent } from './employee-activation.component';


@Injectable()
export class EmployeeActivationUIService {

    public instance: EmployeeActivationComponent;
}
