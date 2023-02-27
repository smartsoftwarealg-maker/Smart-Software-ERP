import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {InputFilter} from './input-filter-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {InputFiltersService} from './input-filters.service';

@Component({
  selector: 'ss-input-filter-list',
  templateUrl: './input-filter-list.component.html',
  styleUrls: ['./input-filter-list.component.scss']
})
export class InputFilterListComponent extends BaseEntityListComponent<InputFilter> {
    displayedColumns = [
        'description',
        'selection'
    ];

    constructor(
        public infoSrv: InputFiltersService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_INPUT_FILTERS');
        this.pagination.pageSize = 15;
    }
}
