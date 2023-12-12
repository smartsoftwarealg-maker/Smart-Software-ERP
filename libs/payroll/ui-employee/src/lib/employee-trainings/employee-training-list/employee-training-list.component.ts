import {Component, Input} from '@angular/core';
import {EmployeeTrainingService} from '../employee-training.service';
import {Training} from '../employee-training';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-employee-training-list',
    templateUrl: './employee-training-list.component.html',
    styleUrls: ['./employee-training-list.component.scss']
})
export class EmployeeTrainingListComponent extends BaseChildEntityListComponent<Training> {
    @Input() editable = true;

    public displayedColumns = [
        'reference',
        'ref_date',
        'motiveName',
        'from_date',
        'to_date',
        'day_count',
        'training',
        'trainer',
        'location',
        'diplomaName',
        'mission_expenses',
        'trn_expenses',
        'extra_expenses',
        'judicialName'
    ];

    constructor(public entitySrv: EmployeeTrainingService) {
        super(entitySrv, 'Training');
    }
}
