import { Component, Input } from '@angular/core';
import {Career, EmployeeCareerService} from '@ss/payroll/api-employee';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-employee-career',
    templateUrl: './employee-career-list.component.html',
    styleUrls: ['./employee-career-list.component.scss']
})
export class EmployeeCareerListComponent extends BaseChildEntityListComponent<Career> {
    private _hrMode = true;

    public displayedColumns = [
        'paymonth',
        'postDescription',
        'divDescription',
        'deptDescription',
        'srvDescription',
        'wrkDescription',
        'gridCategory',
        'profCategory',
        'salary_rank',
        'trial_period'
    ];

    constructor(public entitySrv: EmployeeCareerService) {
        super(entitySrv);
    }

    get hrMode() {
        return this._hrMode;
    }

    @Input()
    set hrMode(mode: boolean) {
        this._hrMode = mode;
    }

    @Input()
    set personId(id: number) {
        this.entitySrv.setParentId(id);
    }

    reorder() {
        this.entitySrv
            .reorder(this.entitySrv.getParentId())
            .subscribe(res => {
                if (res.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                    this.refresh();
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
            });
    }
}
