import { Component } from '@angular/core';

import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Motive } from '../gica-careers-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { MotiveService } from '../services/motive.service';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';


@Component({
    selector: 'ss-gica-motive-list',
    standalone: true,
    imports: [MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, MatHeaderCellDef, PaginationComponent],
    templateUrl: './fault-motive-list.component.html',
    styleUrl: './fault-motive-list.component.css',
})
export class FaultMotiveListComponent extends BaseEntityListComponent<Motive> {
    displayedColumns = [
        'description',
        'dailyGrade'
    ];

    constructor(
        public override entitySrv: MotiveService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_MOTIVES');
        this.pagination.pageSize = 15;
    }
}
