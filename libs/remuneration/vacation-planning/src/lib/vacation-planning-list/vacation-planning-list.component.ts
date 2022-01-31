import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {VacationPlanning} from '../vacation-planning-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {VacationPlanningListService} from '../vacation-planning-list.service';
import {FormControl} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'ss-vacation-planning-list',
  templateUrl: './vacation-planning-list.component.html',
  styleUrls: ['./vacation-planning-list.component.scss']
})
export class VacationPlanningListComponent extends BaseEntityListComponent<VacationPlanning> {
    private readonly THIS_YEAR = new Date().getFullYear();
    period  = new FormControl(  this.THIS_YEAR - 1);
    rate    = new FormControl(173.33);
    periods = [
        this.THIS_YEAR - 10,
        this.THIS_YEAR - 9,
        this.THIS_YEAR - 8,
        this.THIS_YEAR - 7,
        this.THIS_YEAR - 6,
        this.THIS_YEAR - 5,
        this.THIS_YEAR - 4,
        this.THIS_YEAR - 3,
        this.THIS_YEAR - 2,
        this.THIS_YEAR - 1,
        this.THIS_YEAR];

    displayedColumns = [
        'employee',
        'lastName',
        'firstName',
        'acquired',
        'taken',
        'rest'
    ];

    constructor(
        public infoSrv: VacationPlanningListService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_VACATION_PLANNING');
        this.pagination.pageSize = 5;
    }

    onPeriod(event: MatSelectChange) {
        this.infoSrv.year = +event.value;
    }
}
