import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
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
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import {Mission, MissionsService} from "@ss/hr-missions";

@Component({
    selector: 'ss-missions-expenses-list',
    templateUrl: './mission-expenses-list.component.html',
    styleUrls: ['./mission-expenses-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
    ],
})
export class MissionExpensesListComponent extends BaseEntityListComponent<Mission> {
    displayedColumns = [
        'number',
        'lastName',
        'firstName',
        'destination',
        'zoneName',
        'duration',
        'departure',
        'returnback',
    ];

    constructor(
        public missionSrv: MissionsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            missionSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'MISSION_MISSION_EXPENSES',
        );
    }
}

