import { Component, OnInit } from '@angular/core';
import {BaseTransactionListComponent} from '@ss/logistics/api-transaction';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {LanguageService, PaginatorPersistenceService, UserService} from '@ss/common/api-common';
import {AgentService} from '@ss/logistics/api-agent';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {TransferService} from '../transfer.service';

@Component({
    selector: 'ss-inventory-transfer-list',
    templateUrl: './inventory-transfer-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
})
export class InventoryTransferListComponent extends BaseTransactionListComponent {
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
        public transferSrv: TransferService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override userSrv: UserService,
        public override agentSrv: AgentService,
        public override langServ: LanguageService,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override payMethodSrv: PayMethodService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(transferSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            userSrv,
            agentSrv,
            langServ,
            confirmationSrv,
            defReportSrv,
            payMethodSrv,
            pagPersistSrv,
            'STOCK_TRANSFERS');
    }
}
