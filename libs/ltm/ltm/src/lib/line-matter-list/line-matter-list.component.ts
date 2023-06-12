import {Component} from '@angular/core';
import {LTMLineMatter} from '../ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import {LtmLineMatterService} from '../services/ltm-line-matter.service';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { DefaultReportService } from '@ss/common/ui-default-report-component';

@Component({
    selector: 'ss-line-matter-list',
    templateUrl: './line-matter-list.component.html',
    styleUrls: ['./line-matter-list.component.scss'],
})
export class LineMatterListComponent extends BaseEntityListComponent<LTMLineMatter> {

    displayedColumns = [
        'description',
    ];

    constructor(
        public override entitySrv: LtmLineMatterService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LTM_LINE_MATTERS');
        this.pagination.pageSize = 15;
    }
}
