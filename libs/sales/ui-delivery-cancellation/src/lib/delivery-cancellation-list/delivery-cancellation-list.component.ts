import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { Transaction } from '@ss/logistics/api-transaction';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { InventoryService } from '@ss/stock/api-inventory';
import { DELIVERY_CANCELLATION_URL, DeliveryCancellationService } from "@ss/sales/api-delivery-cancellation";

@Component({
    selector: 'ss-delivery-cancellation-list',
    templateUrl: './delivery-cancellation-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
})
export class DeliveryCancellationListComponent extends BaseEntityListComponent<Transaction> {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
    ];


    constructor(
        public inventorySrv: DeliveryCancellationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(inventorySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'SALES_DELIVERY_CANCELLATION');
    }}
