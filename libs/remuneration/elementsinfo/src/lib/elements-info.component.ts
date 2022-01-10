import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ElementsInfo} from './elements-info-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {ElementsInfoService} from './elements-info.service';

@Component({
  selector: 'ss-elements-info',
  templateUrl: './elements-info.component.html',
  styleUrls: ['./elements-info.component.scss']
})
export class ElementsInfoComponent extends BaseEntityListComponent<ElementsInfo> {
    displayedColumns = [
        'field',
        'description',
        'fixed',
        'collective',
        'gridComputed',
        'postComputed',
        'minValue',
        'maxValue'
    ];

    constructor(
        public infoSrv: ElementsInfoService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_ELEMENTSINFO');
        this.pagination.pageSize = 15;
    }

}
