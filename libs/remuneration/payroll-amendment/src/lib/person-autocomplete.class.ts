import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Lookup} from '@ss/remuneration/special-payroll-common';
import {Person} from '@ss/common/api-common';
import {EmployeeService} from '@ss/payroll/api-employee';

export class PersonAutocompleteClass extends DefaultAutoCompleteModel<Lookup> {
    constructor(public employeeSrv: EmployeeService) {
        super(employeeSrv);
    }
    override toString = (x:any) => x ? x['lastName'] + ' ' + x['firstName'] : null
}
