import { Component, Input } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { EmployeeWivesService, Wife } from '@ss/payroll/api-employee';

@Component({
    selector: 'ss-employee-wives',
    templateUrl: './employee-wives-list.component.html',
    styleUrls: ['./employee-wives-list.component.scss']
})
export class EmployeeWivesListComponent extends BaseChildEntityListComponent<Wife> {
    @Input() editable = true;

    public displayedColumns = [
        //        'notDivorced',
        'name',
        'birthdate',
        'birthPlace',
        'father',
        'mother'
    ];

    constructor(public entitySrv: EmployeeWivesService) {
        super(entitySrv);
    }
}
