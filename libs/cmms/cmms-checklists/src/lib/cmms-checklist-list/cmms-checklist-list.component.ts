import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { CmmsChecklistService } from '@ss/cmms/lookups';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Lookup } from '@ss/common/api-lookup';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-cmms-checklist',
    standalone: true,
    imports: [CommonModule, MatCheckboxModule, MatSortModule, MatTableModule, PaginationComponent],
    templateUrl: './cmms-checklist-list.component.html',
    styleUrls: ['./cmms-checklist-list.component.css'],
})
export class CmmsChecklistListComponent extends BaseEntityListComponent<Lookup> {
    displayedColumns = ['description', 'descriptionAr'];
    constructor(
      public override entitySrv: CmmsChecklistService,
      public override shellSrv: ShellService,
      public override snackBarSrv: SnackBarService,
      public override route: ActivatedRoute,
      public override confirmationSrv: ConfirmationDialogService,
      public override defReportSrv: DefaultReportService,
      public override router: Router,
      public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'CMMS_CHECKLIST');
    }
}
