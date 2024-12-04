import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';

import { LtmTestingEquipmentService } from '../services/ltm-testing-equipment.service';
import { LTMTestingEquipment } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-test-equipment-list',
    standalone: true,
    imports: [CommonModule, PaginationComponent, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable,  MatHeaderCellDef],
    templateUrl: './test-equipment-list.component.html',
    styleUrl: './test-equipment-list.component.scss',
})
export class TestEquipmentListComponent extends BaseEntityListComponent<LTMTestingEquipment> {
    displayedColumns = ['description'];


    constructor(
        public override entitySrv: LtmTestingEquipmentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LTM_TEST_EQUIPMENT');
        this.pagination.pageSize = 15;
    }
}
