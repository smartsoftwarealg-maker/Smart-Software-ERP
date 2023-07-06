import { Component } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CMMS_TYPES, Work } from "../../../../cmms-api/cmms-api";
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { CMMSWorkRequestService } from '../c-m-m-s-work-request.service';

@Component({
    selector: 'ss-work-request-list',
    templateUrl: './work-request-list.component.html',
    styleUrls: ['./work-request-list.component.css'],
})
export class WorkRequestListComponent extends BaseEntityListComponent<Work> {
    public Types = CMMS_TYPES;
    displayedColumns = [
        'description',
        'assetDescription',
        'requesterDescription',
        'typeDescription',
        'faultDescription',
        'plannedStart',
        'plannedDue',
    ];

    constructor(
        public override entitySrv: CMMSWorkRequestService,
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
            'CMMS_REQUESTS');
        this.pagination.pageSize = 15;
    }
}
