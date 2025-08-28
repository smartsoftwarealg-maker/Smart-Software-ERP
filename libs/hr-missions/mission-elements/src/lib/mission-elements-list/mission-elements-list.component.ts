import { Component } from '@angular/core';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { MissionElement } from '../mission-elements-api.class';
import { MissionsElementService } from '../mission-element.service';

@Component({
    selector: 'ss-mission-elements-list',
    imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    PaginationComponent,
    TranslateDirective,
    MatHeaderCellDef
],
    templateUrl: './mission-elements-list.component.html',
    styleUrl: './mission-elements-list.component.scss',
    standalone: true,
})
export class MissionElementsListComponent extends BaseEntityListComponent<MissionElement> {
    displayedColumns = [
        'description',
        'fromHour',
        'fromMin',
        'toHour',
        'toMin',
        'elemType',
        'functionOf',
        'typeDescription',
    ];

    constructor(
        public missionSrv: MissionsElementService,
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
            'MISSION_MISSION_ELEMENT',
        );
    }
}
