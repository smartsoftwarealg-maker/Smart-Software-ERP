import { Component } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { PM } from '@ss/cmms/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { CMMSPMService } from '../services/cmms-p-m.service';

@Component({
    selector: 'ss-pm-list',
    templateUrl: './pm-list.component.html',
    styleUrls: ['./pm-list.component.css'],
})
export class PmListComponent extends BaseEntityListComponent<PM> {
    displayedColumns = [
        'reference',
        'description',
        'assetDescription',
        'planDescription',
        'lastReleased',
        'nextDue',
        'daysAhead'
    ];

    constructor(
        public override entitySrv: CMMSPMService,
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
            'CMMS_PM');
        this.pagination.pageSize = 15;
    }

}
