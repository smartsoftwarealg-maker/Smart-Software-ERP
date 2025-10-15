import { Component } from '@angular/core';
import { VacationPlanningDetail } from '../vacation-planning-api';
import { VacationPlanningDetailService } from '@ss/remuneration/vacation-planning';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
} from '@angular/material/table';
import {TranslateDirective, TranslatePipe} from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { AsyncPipe, DatePipe } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'ss-vacation-planning-detail-list',
    templateUrl: './vacation-planning-detail-list.component.html',
    styleUrls: ['./vacation-planning-detail-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatMiniFabButton,
        MatTooltip,
        TranslatePipe,
        TranslateDirective,
        AsyncPipe,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderCellDef,
        MatCell,
        DatePipe,
        MatCellDef,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRowDef,
        MatRow,
        PaginationComponent,
        MatSort,
    ],
})
export class VacationPlanningDetailListComponent extends BaseChildEntityListComponent<VacationPlanningDetail> {
    override displayedColumns = [
        'description',
        'fromDate',
        'toDate',
        'address',
        'reference',
    ];

    constructor(public entitySrv: VacationPlanningDetailService) {
        super(entitySrv, 'REMUN_VACATION_PLANNING');
    }
}
