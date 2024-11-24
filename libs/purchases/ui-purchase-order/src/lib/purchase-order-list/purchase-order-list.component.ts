import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { Transaction } from '@ss/logistics/api-transaction';
import { InventoryService } from '@ss/stock/api-inventory';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { PurchaseOrderService } from "@ss/purchases/api-purchase-order";
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';
import { NgIf, DatePipe } from '@angular/common';
import { DocInfoComponent } from '../../../../../logistics/ui-doc-info/src/lib/doc-info/doc-info.component';

@Component({
    selector: 'ss-ui-order',
    templateUrl: './purchase-order-list.component.html',
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
        NgIf,
        DocInfoComponent,
        DatePipe,
    ],
})
export class PurchaseOrderListComponent extends BaseEntityListComponent<Transaction> {
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
        public inventorySrv: PurchaseOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(inventorySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'PURCHASES_PURCHASE_ORDER');
    }
}
