import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { Transaction } from '@ss/logistics/api-transaction';
import { ConsumptionCancellationService } from '@ss/stock/api-consumption';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-cancellation-consumption-list',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
    templateUrl: './consumption-cancellation-list.component.html'
})
export class ConsumptionCancellationListComponent extends BaseEntityListComponent<Transaction> {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'reference',
        'referenceDocDate',
        'dealer',
        'docStatus'
    ];

    constructor(
        public consumptionSrv: ConsumptionCancellationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(consumptionSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'STOCK_CONSUMPTION_CANCELLATION');
    }
}
