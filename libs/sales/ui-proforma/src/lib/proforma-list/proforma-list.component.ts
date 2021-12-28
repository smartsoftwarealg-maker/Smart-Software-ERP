import { Component } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, PaginatorPersistenceService, User, UserService} from '@ss/common/api-common';
import {AgentService} from '@ss/logistics/api-agent';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {SalesProformaService} from "../sales-proforma.service";
import {BaseTransactionListComponent} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-proforma',
    templateUrl: './proforma-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss']
})
export class ProformaListComponent  extends BaseTransactionListComponent {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
    ];

    constructor(
        public proformaSrv: SalesProformaService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public userSrv: UserService,
        public agentServ: AgentService,
        public langServ: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public payMethodSrv: PayMethodService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(proformaSrv, shellSrv, snackBarSrv, route, router, userSrv, agentServ, langServ, confirmationSrv, defReportSrv, payMethodSrv, pagPersistSrv, 'LOGISTICS_PROFORMA');
    }
}
