import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { CMMSRoutingService } from '../services/cmms.routing.service';
import { CMMSRouting } from '@ss/cmms/cmms-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-cmms-routing-list',
    standalone: true,
    imports: [CommonModule, MatCheckboxModule, MatSortModule, MatTableModule, PaginationComponent, TranslatePipe, TranslateDirective],
    templateUrl: './cmms-routing-list.component.html',
    styleUrls: ['../list-template/cmms-fault-list.component.css'],
})
export class CMMSRoutingListComponent extends BaseEntityListComponent<CMMSRouting> {
    displayedColumns = ['description', 'descriptionAr', 'cost', 'laborHours'];
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
