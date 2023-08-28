import { Component, Input } from '@angular/core';
import { EmployeeActivationService, EmployeeActivation } from '@ss/payroll/api-employee';
import { PaginationModel } from '@ss/common/api-common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-emp-act-history',
    templateUrl: './employee-activation-list.component.html',
    styleUrls: ['./employee-activation-list.component.scss']
})
export class EmployeeActivationListComponent extends BaseChildEntityListComponent<EmployeeActivation> {
    public displayedColumns = [
        'centerName',
        'hireDate',
        'empTypeDescription',
        'suspended',
        'suspensionDate',
        'suspendReasonDescription',
        'inConflict'
    ];
    public readonly pagination = PaginationModel.newInstance();
    public data: EmployeeActivation[] = [];
    public selected = 0;
    public employmentTypes: { [id: number]: string; };
    public suspensionReasons: { [id: number]: string; };

    constructor(public entitySrv: EmployeeActivationService) {
        super(entitySrv);
    }

}
