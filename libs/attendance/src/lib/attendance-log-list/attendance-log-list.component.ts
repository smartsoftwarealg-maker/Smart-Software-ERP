import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ATTSignature} from '../attendance-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {SignatureService} from '../signature.service';

@Component({
    selector: 'ss-attendance-log-list',
    templateUrl: './attendance-log-list.component.html',
    styleUrls: ['./attendance-log-list.component.scss'],
})
export class AttendanceLogListComponent extends BaseEntityListComponent<ATTSignature> {
    displayedColumns = [
        'personId',
        'firstName',
        'lastName',
        'dateTime',
        'typeDescription',
        'updaterName',
    ];

    constructor(
        public override entitySrv: SignatureService,
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
            'ATT_SIGNATURES');
        this.pagination.pageSize = 15;
    }
}
