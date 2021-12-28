import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ConsumptionService} from '@ss/stock/api-consumption';
import {LanguageService, PaginatorPersistenceService, UserService} from '@ss/common/api-common';
import {AgentService} from '@ss/logistics/api-agent';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseTransactionListComponent} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-consumption-list',
    styleUrls: ['../../../../common/assets/src/assets/transac-list.scss'],
    templateUrl: './consumption-list.component.html'
})
export class ConsumptionListComponent extends BaseTransactionListComponent {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'reference',
        'referenceDocDate',
        'dealer'
    ];


    constructor(
        public consumptionSrv: ConsumptionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public usersSrv: UserService,
        public agentSrv: AgentService,
        public langServ: LanguageService,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(consumptionSrv, shellSrv, snackBarSrv, route, router, usersSrv, agentSrv, langServ, confirmationSrv, defReportSrv, null, pagPersistSrv, 'STOCK_CONSUMPTION');
    }
}
