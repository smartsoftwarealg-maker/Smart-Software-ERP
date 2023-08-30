import { Component } from '@angular/core';
import { Lookup } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CMMSRoutingService } from '../services/cmms.routing.service';
import { CMMSRouting } from "./routing-api";

@Component({
    selector: 'ss-cmms-routing-list',
    templateUrl: '../list-template/cmms-fault-list.component.html',
    styleUrls: ['../list-template/cmms-fault-list.component.css'],
})
export class CMMSRoutingListComponent extends BaseEntityListComponent<CMMSRouting> {
    displayedColumns = ['description', 'descriptionAr', 'isCheckList'];
    constructor(
        public override entitySrv: CMMSRoutingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'CMMS_ROUTING');
    }
}
