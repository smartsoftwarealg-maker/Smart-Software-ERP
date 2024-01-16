import { Component } from '@angular/core';
import { EmployeeActivationService, EmployeeActivation } from '@ss/payroll/api-employee';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-emp-act-history',
    templateUrl: './employee-activation-list.component.html',
    styleUrls: ['./employee-activation-list.component.scss']
})
export class EmployeeActivationListComponent extends BaseChildEntityListComponent<EmployeeActivation> {
    foreignRecord = false;
    public displayedColumns = [
        'centerName',
        'hireDate',
        'empTypeDescription',
        'suspended',
        'suspensionDate',
        'suspendReasonDescription',
        'inConflict',
        'isFinal'
    ];
    // public readonly pagination = PaginationModel.newInstance();
    // public employmentTypes: { [id: number]: string; };

    constructor(public entitySrv: EmployeeActivationService) {
        super(entitySrv, 'Activation');
    }

    selectRow(row: EmployeeActivation) {
        super.selectRow(row);
        this.foreignRecord = row?.centerId !== this.loginSrv.appCtx.center;
    }
}
