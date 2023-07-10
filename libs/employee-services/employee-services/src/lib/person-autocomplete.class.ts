import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { EmployeeService } from '@ss/employee-services/employee-services';
import { Employee } from '@ss/employee-services/employee-services';

export class PersonAutocompleteClass extends DefaultAutoCompleteModel<Employee> {
    constructor(public employeeSrv: EmployeeService) {
        super(employeeSrv, 'id', 'lastName');
    }

    override toString = (x:any) => x ? x['lastName'] + ' ' + x['firstName'] : null;
}
