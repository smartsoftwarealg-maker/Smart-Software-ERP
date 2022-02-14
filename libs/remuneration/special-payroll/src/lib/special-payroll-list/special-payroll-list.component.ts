import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Special} from '../special-payroll.class';
import {InputFiltersService} from '@ss/remuneration/input-filters';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {SpecialPayrollService} from '../special-payroll.service';

@Component({
  selector: 'ss-special-payroll-list',
  templateUrl: './special-payroll-list.component.html',
  styleUrls: ['./special-payroll-list.component.scss']
})
export class SpecialPayrollListComponent extends BaseEntityListComponent<Special> {
    displayedColumns = ['description'];

    constructor(
        public infoSrv: SpecialPayrollService,
        override shellSrv: ShellService,
        override snackBarSrv: SnackBarService,
        override route: ActivatedRoute,
        override confirmationSrv: ConfirmationDialogService,
        override defReportSrv: DefaultReportService,
        override router: Router,
        override pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_SPECIAL_PAYROLLS');
        this.pagination.pageSize = 15;
    }


}
