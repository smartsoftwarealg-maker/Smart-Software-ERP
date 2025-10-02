import { Component } from '@angular/core';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef, MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {TranslateDirective} from "@ss/common/ui-lang";
import {PaginationComponent} from "@ss/common/ui-pagination";
import {DocInfoComponent} from "@ss/logistics/ui-doc-info";
import {DatePipe} from "@angular/common";
import {TransferService} from "../../../../inventory-transfers/src/lib/transfer.service";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from "@ss/common/ui-default-report-component";
import {PaginatorPersistenceService} from "@ss/common/api-common";
import {BaseEntityListComponent} from "@ss/common/ui-base-entity";
import {Transaction} from "@ss/logistics/api-transaction";
import {TransferReintegrationService} from "../services/transfer-reintegration.service";

@Component({
    selector: 'ss-transfer-reintegration',
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
    templateUrl: './transfer-reintegration-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
})
export class TransferReintegrationListComponent extends BaseEntityListComponent<Transaction> {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
        'docStatus'
    ];

    constructor(
        public transferSrv: TransferReintegrationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(transferSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'STOCK_TRANSFER_REINTEGRATION');
    }

}
