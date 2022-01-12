import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {InputFilter} from './input-filter-api';
import {ElementsInfoService} from '@ss/remuneration/elementsinfo';
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
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_INPUT_FILTERS');
        this.pagination.pageSize = 15;
    }

}
