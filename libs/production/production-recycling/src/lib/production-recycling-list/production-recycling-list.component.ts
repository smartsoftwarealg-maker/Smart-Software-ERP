import { Component, signal } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { Transaction } from '@ss/logistics/api-transaction';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { DatePipe } from '@angular/common';
import { ProductionRecyclingService } from '../production-recycling-services/production-recycling.service';

@Component({
    selector: 'ss-production-recycling-list',
    templateUrl: './production-recycling-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DocInfoComponent,
        DatePipe,
    ],
})
export class ProductionRecyclingListComponent extends BaseEntityListComponent<Transaction> {
    readonly displayedColumns = ([
        'number',
        'date',
        'reference',
        'referenceDocDate',
        'dealer',
        'docStatus',
    ]);

    constructor(
        public inventorySrv: ProductionRecyclingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            inventorySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'PROD_PRODUCTIONS_RECYCLING',
        );
    }
}
