import {Component} from '@angular/core';
import {Mission} from '../missions-api.class';
import {ActivatedRoute, Router} from '@angular/router';
import {MissionsService} from '../missions.service';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';

@Component({
    selector: 'ss-mission-preparation',
    templateUrl: './mission-preparation-list.component.html',
    styleUrls: ['./mission-preparation-list.component.scss']
})
export class MissionPreparationListComponent extends BaseEntityListComponent<Mission> {
    displayedColumns = [
        'number',
        'lastName',
        'firstName',
        'destination',
        'zoneName',
        'duration',
        'departure',
        'returnback'
    ];

    constructor(
        public missionSrv: MissionsService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(missionSrv,
             shellSrv,
             snackBarSrv,
             route,
             router,
             confirmationSrv,
             defReportSrv,
             pagPersistSrv,
             'MISSION_MISSION_PREPARATION');
    }
}
