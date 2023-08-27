import { Component } from '@angular/core';
import { EmployeeContractService, Contract } from '@ss/payroll/api-employee';
import { PaginationModel } from '@ss/common/api-common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-employee-contracts',
    templateUrl: './employee-contracts-list.component.html',
    styleUrls: ['./employee-contracts-list.component.scss']
})
export class EmployeeContractListComponent extends BaseChildEntityListComponent<Contract> {
    editable = true;

    public displayedColumns = [
        'number',
        'recordNumber',
        'date',
        'fromdate',
        'todate',
        'valid_date',
        'post',
        'division',
        'department',
        'service',
        'salarygrid', // todo: add lookup
        'salary_rank',
        'basesalary',
        'notes',
        'motive', // todo: add lookup
        'cost_center', // todo: add lookup
        'confirmed',
        'trial_period'
    ];

    public readonly pagination = PaginationModel.newInstance();
    public data: Contract[] = [];
    public selected = 0;

    constructor(public entitySrv: EmployeeContractService) {
        super(entitySrv);
    }
}
