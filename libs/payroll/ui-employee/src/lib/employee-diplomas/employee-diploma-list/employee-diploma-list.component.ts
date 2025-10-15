import { Component, inject } from '@angular/core';
import {PersonDiploma} from '../employee-diploma-api';
import {EmployeeDiplomaService} from '../employee-diploma.service';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';
import { ActivePersonnelService } from '../../active-personnel.service';

@Component({
    selector: 'ss-employee-diploma-list',
    templateUrl: './employee-diploma-list.component.html',
    styleUrls: ['./employee-diploma-list.component.scss'],
    standalone: true,
    imports: [MatMiniFabButton, MatTooltip, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, DatePipe, TranslatePipe]
})
export class EmployeeDiplomaListComponent extends BaseChildEntityListComponent<PersonDiploma> {
    // @Input() editable = true;

    public override displayedColumns = [
        'diplomaName',
        'subjectName',
        // 'diploma_year',
        'memo',
        'institution',
        'from_date',
        'to_date',
        'levelName'
    ];

    activePersonnelSrv = inject(ActivePersonnelService);

    constructor(public entitySrv: EmployeeDiplomaService) {
        super(entitySrv, 'PersonDiploma');
    }
}
