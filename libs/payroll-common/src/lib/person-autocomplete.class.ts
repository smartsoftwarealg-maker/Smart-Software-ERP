import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Lookup} from '@ss/remuneration/special-payroll-common';
import {Employee, EmployeeService} from '@ss/payroll/api-employee';

export class PersonAutocompleteClass extends DefaultAutoCompleteModel<Employee> {
    constructor(public employeeSrv: EmployeeService) {
        super(employeeSrv, 'id', 'lastName');
    }

    override toString = (x:any) => x ? x['lastName'] + ' ' + x['firstName'] : null;
}
