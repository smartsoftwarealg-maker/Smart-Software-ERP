import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryExitService} from '@ss/stock/api-inventory-exit';
import {LanguageService, PaginatorPersistenceService, UserService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {UserListService} from '@ss/common/api-users';
import {BaseTransactionListComponent} from '@ss/logistics/api-transaction';
import {AgentService} from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-inventory-exit-list',
    styleUrls: ['../../../../common/assets/src/assets/transac-list.scss'],
    templateUrl: './inventory-exit-list.component.html'
})
export class InventoryExitListComponent extends BaseTransactionListComponent {
    displayedColumns = [
        'number',
        'date',
        'reference',
        'referenceDocDate',
        'dealer'
    ];


    constructor(
        public inventoryExitSrv: InventoryExitService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public userSrv: UserService,
        public agentSrv: AgentService,
        public usersService: UserListService,
        public langServ: LanguageService,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(inventoryExitSrv, shellSrv, snackBarSrv, route, router, userSrv, agentSrv, langServ, confirmationSrv, defReportSrv, null, pagPersistSrv, 'STOCK_INVENTORY_EXIT');
    }
}
