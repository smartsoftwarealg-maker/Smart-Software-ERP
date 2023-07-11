import { Component } from '@angular/core';
import { Lookup } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CMMSSolutionService } from '../services/cmms.solution.service';

@Component({
    selector: 'ss-cmms-solution-list',
    templateUrl: '../list-template/cmms-fault-list.component.html',
    styleUrls: ['../list-template/cmms-fault-list.component.css'],
})
export class CMMSSolutionListComponent extends BaseEntityListComponent<Lookup> {
    displayedColumns = ['description', 'descriptionAr'];
    constructor(
        public override entitySrv: CMMSSolutionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'CMMS_SOLUTION');
    }
}
