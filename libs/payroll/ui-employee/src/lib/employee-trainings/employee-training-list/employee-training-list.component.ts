import { Component, inject } from '@angular/core';
import {EmployeeTrainingService} from '../employee-training.service';
import {Training} from '../employee-training';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { AsyncPipe, DecimalPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '@ss/common/ui-lang';
import { ActivePersonnelService } from '../../active-personnel.service';

@Component({
    selector: 'ss-employee-training-list',
    templateUrl: './employee-training-list.component.html',
    styleUrls: ['./employee-training-list.component.scss'],
    standalone: true,
    imports: [MatMiniFabButton, MatTooltip, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, DecimalPipe, DatePipe, TranslatePipe]
})
export class EmployeeTrainingListComponent extends BaseChildEntityListComponent<Training> {
    // @Input() editable = true;

    public override displayedColumns = [
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

    activePersonnelSrv = inject(ActivePersonnelService);

    constructor(public entitySrv: EmployeeTrainingService) {
        super(entitySrv, 'Training');
    }
}
