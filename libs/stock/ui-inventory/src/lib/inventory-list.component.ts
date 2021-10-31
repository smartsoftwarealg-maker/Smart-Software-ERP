import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryService} from '@ss/stock/api-inventory';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LanguageService, User, UserService} from '@ss/common/api-common';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {Transaction} from '@ss/logistics/api-transaction';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseTransactionListComponent} from "../../../../logistics/api-transaction/src/lib/base-transaction-list.component";

@Component({
    selector: 'ss-inventory-list',
    styleUrls: ['./inventory-list.component.scss'],
    templateUrl: './inventory-list.component.html'
})
export class InventoryListComponent extends BaseTransactionListComponent {
    displayedColumns = [
        'number',
        'date',
        'reference',
        'referenceDocDate',
        'dealer'
    ];


    constructor(
        public inventorySrv: InventoryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public userSrv: UserService,
        public agentSrv: AgentService,
        public langServ: LanguageService,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService) {
        super(inventorySrv, shellSrv, snackBarSrv, route, router, userSrv, agentSrv, langServ, confirmationSrv, defReportSrv, null, 'STOCK_INVENTORY');
    }
}
