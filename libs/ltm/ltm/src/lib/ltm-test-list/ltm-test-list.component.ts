import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LTMTest} from '../ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {LtmTestService} from '../services/ltm-test.service';

@Component({
    selector: 'ss-ltm-test-list',
    templateUrl: './ltm-test-list.component.html',
    styleUrls: ['./ltm-test-list.component.scss'],
})
export class LtmTestListComponent extends BaseEntityListComponent<LTMTest> {
    displayedColumns = ['id', 'description', 'variable', 'formula', 'showGraph'];

    constructor(
        public override entitySrv: LtmTestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LTM_TESTS');
        this.pagination.pageSize = 15;
    }
}
