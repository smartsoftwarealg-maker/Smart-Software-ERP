import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LTMTest} from '@ltm/ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import { LtmTestService } from '@ltm/ltm-api';

import { ReactiveFormsModule } from "@angular/forms";
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-test-list',
    templateUrl: './ltm-test-list.component.html',
    styleUrls: ['./ltm-test-list.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    PaginationComponent,
    ReactiveFormsModule,
    TranslateDirective
],
})
export class LtmTestListComponent extends BaseEntityListComponent<LTMTest> {
    displayedColumns = [
        'variable',
        'description',
        'descriptionAr',
        'chemicalFormula',
        'formula',
        'showGraph',
        'showKPI',
        'varianceControl',
        'isSimulated'
    ];

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
