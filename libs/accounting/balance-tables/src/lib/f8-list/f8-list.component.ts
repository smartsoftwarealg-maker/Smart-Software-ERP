import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { F8 } from '../services/balance-tables.api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { F8Service } from '../services/f8-service';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { AccFileService } from '@ss/accounting/accounting-api';

@Component({
    selector: 'ss-f8-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, UiPaginationModule, MatHeaderCellDef],
    templateUrl: './f8-list.component.html',
    styleUrl: './f8-list.component.scss',
})
export class F8ListComponent extends BaseEntityListComponent<F8> {
    #accFileSrv = inject(AccFileService);
    displayedColumns = ['debtor', 'value1', 'value2'];

    constructor(
        public override entitySrv: F8Service,
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
            'ACC_F8');
        this.pagination.pageSize = 15;
        entitySrv.setParentId(this.#accFileSrv.accFile?.id);
    }
}
