import { Component, OnInit } from '@angular/core';
import {BaseTransactionListComponent} from '@ss/logistics/api-transaction';
import {TransferService} from '../transfer.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {LanguageService, PaginatorPersistenceService, UserService} from '@ss/common/api-common';
import {AgentService} from '@ss/logistics/api-agent';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {TransferReceptionService} from '../transfer-reception.service';

@Component({
    selector: 'ss-transfer-reception-list',
    templateUrl: './transfer-reception-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
})
export class TransferReceptionListComponent  extends BaseTransactionListComponent {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
    ];

    constructor(
        public transferSrv: TransferReceptionService,
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
            'STOCK_TRANSFER_RECEPTIONS');
    }
}
