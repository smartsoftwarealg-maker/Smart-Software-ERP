import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { IEmployee } from '@ss/employee-services/employee-services';
import { BaseEntityService } from '@ss/common/api-base-entity';

export class PersonAutocompleteClass extends DefaultAutoCompleteModel<IEmployee> {
    constructor(public employeeSrv: BaseEntityService<IEmployee>) {
        super(employeeSrv, 'id', 'lastName');
    }

    override toString = (x:IEmployee) => x ? x['lastName'] + ' ' + x['firstName'] : null;
}
