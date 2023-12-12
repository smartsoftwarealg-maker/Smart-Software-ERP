import { Component } from '@angular/core';
import { EmployeeChildrenService, Child } from '@ss/payroll/api-employee';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-employee-children',
    templateUrl: './employee-children-list.component.html',
    styleUrls: ['./employee-children-list.component.scss']
})
export class EmployeeChildrenListComponent extends BaseChildEntityListComponent<Child> {
    public displayedColumns = [
        'name',
        'birthDate',
        'birthPlace',
        'sex'
    ];

    constructor(public entitySrv: EmployeeChildrenService) {
        super(entitySrv, 'Child');
    }
}
