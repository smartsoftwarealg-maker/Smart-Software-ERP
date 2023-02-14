import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {LTMLine} from '../ltm-api';
import {LtmLineService} from '../ltm-line.service';

@Component({
    selector: 'ss-ltm-line-list',
    templateUrl: './ltm-line-list.component.html',
    styleUrls: ['./ltm-line-list.component.scss'],
})
export class LtmLineListComponent extends BaseEntityListComponent<LTMLine> {

    displayedColumns = [
        'code',
        'description',
    ];

    constructor(
        public override entitySrv: LtmLineService,
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
            'LTM_LINES');
    }
}

