import { Component } from '@angular/core';
import { Transaction } from "@ss/logistics/api-transaction";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ReceptionCancellationService} from '../reception-cancellation.service';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DatePipe } from '@angular/common';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@Component({
    selector: 'ss-reception-cancellation-list',
    templateUrl: './reception-cancellation-list.component.html',
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
    DatePipe
],
})
export class ReceptionCancellationListComponent extends BaseEntityListComponent<Transaction> {

    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
        'dealer',
        'docStatus'
    ];

    constructor(
        public receptionSrv: ReceptionCancellationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(receptionSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'STOCK_RECEPTION_CANCELLATION');
    }
}
