import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { Transaction } from '@ss/logistics/api-transaction';
import { InventoryService } from '@ss/stock/api-inventory';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { InventoryExitService } from "@ss/stock/api-inventory-exit";

@Component({
    selector: 'ss-inventory-exit-list',
    styleUrls: ['../../../../common/assets/src/assets/transac-list.scss'],
    templateUrl: './inventory-exit-list.component.html'
})
export class InventoryExitListComponent extends BaseEntityListComponent<Transaction> {
    displayedColumns = [
        'number',
        'date',
        'reference',
        'referenceDocDate',
        'dealer',
        'docStatus'
    ];


    constructor(
        public inventorySrv: InventoryExitService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(inventorySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'STOCK_INVENTORY_EXIT');
    }
}
