import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ReceptionService} from '@ss/purchases/api-reception';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LanguageService, User, UserService} from '@ss/common/api-common';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {Transaction} from '@ss/logistics/api-transaction';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseTransactionListComponent} from "../../../../logistics/api-transaction/src/lib/base-transaction-list.component";

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
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public userSrv: UserService,
        public agentServ: AgentService,
        public langServ: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public payMethodSrv: PayMethodService) {
        super(receptionSrv, shellSrv, snackBarSrv, route, router, userSrv, agentServ, langServ, confirmationSrv, defReportSrv, payMethodSrv, 'STOCK_RECEPTION');
    }
}
