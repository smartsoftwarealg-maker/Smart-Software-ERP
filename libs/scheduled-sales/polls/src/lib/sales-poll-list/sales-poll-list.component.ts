import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, PaginatorPersistenceService } from '@ss/common/api-common';

import {
    MatCell, MatCellDef, MatColumnDef,
    MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { SalesPoll } from '@ss/scheduled-sales/api-scheduled-sales';
import { SalesPollService } from '../sales-poll.service';


@Component({
    selector: 'sch-sales-poll-list',
    standalone: true,
    imports: [
        CommonModule,
        MatCell,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatRow,
        MatSort,
        MatSortHeader,
        MatTable,
        PaginationComponent,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        TranslateDirective
    ],
    templateUrl: './sales-poll-list.component.html',
    styleUrl: './sales-poll-list.component.css',
})
export class SalesPollListComponent extends BaseEntityListComponent<SalesPoll>{
    private loginSrv = inject(LoginService);

    displayedColumns = [
        'date',
        'number',
    ];

    constructor(
        public override entitySrv: SalesPollService,
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
            'SCH_SALES_POLL');
        this.pagination.pageSize = 15;
    }

}
