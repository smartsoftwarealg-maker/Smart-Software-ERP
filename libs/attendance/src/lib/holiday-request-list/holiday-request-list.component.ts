import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {HolidayRequest} from '@ss/payroll/api-employee';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {HolidayRequestService} from '../holiday-request.service';

@Component({
    selector: 'ss-holiday-request-list',
    templateUrl: './holiday-request-list.component.html',
    styleUrls: ['./holiday-request-list.component.scss'],
})
export class HolidayRequestListComponent extends BaseEntityListComponent<HolidayRequest> {
    displayedColumns = [
        'typeDescription',
        'from',
        'to',
        'docDescription'
    ];

    constructor(
        public override entitySrv: HolidayRequestService,
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
            'ATT_HOLIDAY_REQUEST');
        this.pagination.pageSize = 15;
    }
}
