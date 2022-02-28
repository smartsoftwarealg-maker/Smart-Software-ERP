import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Trajectory} from '../trajectory';
import {BankService} from '@ss/administration/api-bank';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {TrajectoryService} from '../trajectory.service';

@Component({
  selector: 'ss-trajectory-list',
  templateUrl: './trajectory-list.component.html',
  styleUrls: ['./trajectory-list.component.scss']
})
export class TrajectoryListComponent extends BaseEntityListComponent<Trajectory> {
    displayedColumns = ['description', 'distance'];

    constructor(
        public listSrv: TrajectoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(listSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'MISSION_TRAJECTORIES');
    }


}
