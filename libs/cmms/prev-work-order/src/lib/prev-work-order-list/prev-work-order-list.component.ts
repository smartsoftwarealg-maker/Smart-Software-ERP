import { Component } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Work, WORK_TYPES } from '@ss/cmms/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { CMMSPrevWorkOrderService } from '../c-m-m-s-prev-work-order.service';

@Component({
    selector: 'ss-prev-work-order-list',
    templateUrl: './prev-work-order-list.component.html',
    styleUrls: ['./prev-work-order-list.component.css'],
})
export class PrevWorkOrderListComponent extends BaseEntityListComponent<Work> {
    public Types = WORK_TYPES;
    displayedColumns = [
        'description',
        'assetDescription',
        'requesterDescription',
        'typeDescription',
        'faultDescription',
        'plannedStart',
        'plannedDue',
        'statusDescription'
    ];

    constructor(
        public override entitySrv: CMMSPrevWorkOrderService,
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
            'CMMS_PREV_WORK_ORDER');
        this.pagination.pageSize = 15;
    }
}
