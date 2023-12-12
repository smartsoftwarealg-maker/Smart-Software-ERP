import { Component } from '@angular/core';
import { EmployeeOldCareerService, OldCareer } from '@ss/payroll/api-employee';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-employee-old-career-list',
    templateUrl: './employee-old-career-list.component.html',
    styleUrls: ['./employee-old-career-list.component.scss']
})
export class EmployeeOldCareerListComponent extends BaseChildEntityListComponent<OldCareer> {
    private _hrMode = true;
    activePersonnel = true;
    editable = true;

    public displayedColumns = [
        'post',
        'rate',
        //        'ctype',
        'from_date',
        'to_date',
    ];


    constructor(public entitySrv: EmployeeOldCareerService) {
        super(entitySrv, 'OldCareer');
    }

    get hrMode() {
        return this._hrMode;
    }
}
