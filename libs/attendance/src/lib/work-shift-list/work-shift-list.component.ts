import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {WorkShift} from '../attendance-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {WorkshiftService} from '../workshift.service';

@Component({
    selector: 'ss-work-shift-list',
    templateUrl: './work-shift-list.component.html',
    styleUrls: ['./work-shift-list.component.scss'],
})
export class WorkShiftListComponent extends BaseEntityListComponent<WorkShift> {
    displayedColumns = [
        'description',
        'startDate',
        'graceTime',
        'period'
    ];

    constructor(
        public override entitySrv: WorkshiftService,
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
            'ATT_WORKSHIFTS');
        this.pagination.pageSize = 15;
    }
}
