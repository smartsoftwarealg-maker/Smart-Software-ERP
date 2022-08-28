import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Quota} from '@ss/scheduled-sales/api-scheduled-sales';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {SSQuotaService} from '@ss/scheduled-sales/api-scheduled-sales';

@Component({
    selector: 'ss-sales-quota-list',
    templateUrl: './sales-quota-list.component.html',
    styleUrls: ['./sales-quota-list.component.scss'],
})
export class SalesQuotaListComponent extends BaseEntityListComponent<Quota> {
    displayedColumns = [
        'salesDate',
        'reference',
        'customerCode',
        'customerName',
        'description',
        'qty',
    ];

    constructor(
        public override entitySrv: SSQuotaService,
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
            'SCH_QUOTAS');
        this.pagination.pageSize = 10;
    }
}
