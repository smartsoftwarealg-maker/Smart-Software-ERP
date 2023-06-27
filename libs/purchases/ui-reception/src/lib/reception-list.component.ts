import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import { Transaction } from '@ss/logistics/api-transaction';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { InventoryService } from '@ss/stock/api-inventory';

@Component({
    selector: 'ss-reception-list',
    styleUrls: ['../../../../common/assets/src/assets/transac-list.scss'],
    templateUrl: './reception-list.component.html'
})
export class ReceptionListComponent extends BaseEntityListComponent<Transaction> {

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
        public inventorySrv: InventoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(inventorySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_RECEPTION');
    }
}
