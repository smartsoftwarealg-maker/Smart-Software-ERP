import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LTMLine, LTMMatter} from '../ltm-api';
import {LtmLineService} from '../ltm-line.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {LtmMatterService} from '../ltm-matter.service';

@Component({
    selector: 'ss-ltm-matter-list',
    templateUrl: './ltm-matter-list.component.html',
    styleUrls: ['../ltm-line-list/ltm-line-list.component.scss'],
})
export class LtmMatterListComponent  extends BaseEntityListComponent<LTMMatter> {

    displayedColumns = [
        'description',
    ];

    constructor(
        public override entitySrv: LtmMatterService,
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
            'LTM_MATTERS');
    }
}
