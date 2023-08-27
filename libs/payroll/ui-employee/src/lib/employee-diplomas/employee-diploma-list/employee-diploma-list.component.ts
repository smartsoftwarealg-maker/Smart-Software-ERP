import {Component, Input} from '@angular/core';
import {EmployeeDiploma} from '../employee-diploma-api';
import {EmployeeDiplomaService} from '../employee-diploma.service';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-employee-diploma-list',
    templateUrl: './employee-diploma-list.component.html',
    styleUrls: ['./employee-diploma-list.component.scss']
})
export class EmployeeDiplomaListComponent extends BaseChildEntityListComponent<EmployeeDiploma> {
    @Input() editable = true;

    public displayedColumns = [
        'diplomaName',
        'subjectName',
        // 'diploma_year',
        'memo',
        'institution',
        'from_date',
        'to_date',
        'levelName'
    ];

    constructor(public entitySrv: EmployeeDiplomaService) {
        super(entitySrv);
    }
}
