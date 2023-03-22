import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {AttendanceMachine} from '../attendance-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {AttendanceMachineService} from '../attendance-machine.service';

@Component({
    selector: 'ss-attendance-machine-list',
    templateUrl: './attendance-machine-list.component.html',
    styleUrls: ['./attendance-machine-list.component.scss'],
})
export class AttendanceMachineListComponent extends BaseEntityListComponent<AttendanceMachine> {
    displayedColumns = [
        'description',
        'ipAddress',
        'port'
    ];

    constructor(
        public override entitySrv: AttendanceMachineService,
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
            'ATT_MACHINES');
        this.pagination.pageSize = 15;
    }
}
