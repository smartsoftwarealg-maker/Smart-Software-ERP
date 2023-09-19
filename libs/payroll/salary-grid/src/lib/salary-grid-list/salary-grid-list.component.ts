import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Grid} from '../grid-api';
import {BankService} from '@ss/administration/api-bank';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {GridService} from '../grid.service';

@Component({
  selector: 'ss-salary-grid-list',
  templateUrl: './salary-grid-list.component.html',
  styleUrls: ['./salary-grid-list.component.scss']
})
export class SalaryGridListComponent extends BaseEntityListComponent<Grid> {
    displayedColumns = [
        'category',
        'sec',
        'baseSalary',
        'base0',
        'base2',
        'base3',
        'base4',
        'base5',
        'base6',
        'base7',
        'base8',
        'base9',
        'base10',
        'base11',
        'base12',
        'base13',
        'base14',
        'base15',
        'base16',
        'base17',
        'base18',
        // 'base19',
    ];


    constructor(
        public gridSrv: GridService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        pagPersistSrv: PaginatorPersistenceService) {
        super(gridSrv,
             shellSrv,
             snackBarSrv,
             route,
             router,
             confirmationSrv,
             defReportSrv,
             pagPersistSrv,
            'PAYROLL_SALARY_GRID');
        this.pagPersistSrv = pagPersistSrv;
        this.pagination.pageSize = 10;
    }

}
