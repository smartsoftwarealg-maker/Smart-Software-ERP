import { Component } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CMMSPlan } from '@ss/cmms/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { CMMSPlanService } from '../cmms-plan.service';

@Component({
    selector: 'ss-cmms-plan-list',
    templateUrl: './cmms-plan-list.component.html',
    styleUrls: ['./cmms-plan-list.component.css'],
})
export class CMMSPlanListComponent extends BaseEntityListComponent<CMMSPlan> {
    readonly TYPES = ['CMMS_TIME', 'CMMS_READING', 'CMMS_EITHER'];
    displayedColumns = [
        'description',
        'repeatMonths',
        'scheduleType'
    ];
    constructor(
        public override entitySrv: CMMSPlanService,
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
            'CMMS_PLANS');
        this.pagination.pageSize = 15;
    }
}
