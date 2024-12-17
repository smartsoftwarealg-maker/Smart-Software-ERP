import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent, BaseEntityListComponent } from '@ss/common/ui-base-entity';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';

import { LtmEquipmentTestService } from '../../../../product-liberation/src/lib/services/ltm-equipment-test.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMiniFabButton } from '@angular/material/button';
import { LTMEquipmentTesting, LTMTestEquipmentTest } from '@ltm/ltm-api';
import { LtmEquipmentTestingService } from '../../../../product-liberation/src/lib/services/ltm-equipment-testing.service';
import { BudgetService } from '@ss/budget/budget';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-test-equipment-testing-input-list',
    standalone: true,
    imports: [
        CommonModule,
        PaginationComponent,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        MatHeaderCellDef,
        TranslateDirective
    ],
    templateUrl: './test-equipment-testing-input-list.component.html',
    styleUrl: './test-equipment-testing-input-list.component.scss',
})
export class TestEquipmentTestingInputListComponent extends BaseEntityListComponent<LTMEquipmentTesting> {
    displayedColumns = ['equipmentDescription', 'time'];

    constructor(
        public override entitySrv: LtmEquipmentTestingService,
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
            'LTM_TEST_EQUIPMENT_TESTING');
        this.pagination.pageSize = 15;
    }

}
