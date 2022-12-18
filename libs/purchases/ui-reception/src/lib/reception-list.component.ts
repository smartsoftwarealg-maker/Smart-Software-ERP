import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ReceptionService} from '@ss/purchases/api-reception';
import {LanguageService, PaginatorPersistenceService, UserService} from '@ss/common/api-common';
import {AgentService} from '@ss/logistics/api-agent';
import {BaseTransactionListComponent} from '@ss/logistics/api-transaction';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';

@Component({
    selector: 'ss-reception-list',
    styleUrls: ['../../../../common/assets/src/assets/transac-list.scss'],
    templateUrl: './reception-list.component.html'
})
export class ReceptionListComponent extends BaseTransactionListComponent {

    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
        'dealer'
    ];


    constructor(
        public receptionSrv: ReceptionService,
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
        super(receptionSrv, shellSrv, snackBarSrv, route, router, userSrv, agentSrv, langServ, confirmationSrv, defReportSrv, payMethodSrv, pagPersistSrv, 'COMMON_RECEPTION');
    }
}
