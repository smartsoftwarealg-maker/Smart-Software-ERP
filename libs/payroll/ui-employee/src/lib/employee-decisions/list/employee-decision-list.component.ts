import { Component, Input } from '@angular/core';
import { EmployeeDecisionService, Decision } from '@ss/payroll/api-employee';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-employee-decision-list',
    templateUrl: './employee-decision-list.component.html',
    styleUrls: ['./employee-decision-list.component.scss']
})
export class EmployeeDecisionListComponent extends BaseChildEntityListComponent<Decision> {
    @Input() editable = true;

    public displayedColumns = [
        'dec_reference',
        'dec_date',
        'application_date',
        'motiveName',
        'application_period',
        'dec_header'
    ];

    constructor(public entitySrv: EmployeeDecisionService) {
        super(entitySrv);
    }
}
