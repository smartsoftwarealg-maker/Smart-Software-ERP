import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LookupsService} from '@ss/common/api-lookup';
import {Observable, of} from 'rxjs';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {Account, ACCOUNT_TYPES, AccountService} from '@ss/accounting/api-accounts';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
    selector: 'ss-account-list',
    styleUrls: ['./account-list.component.scss'],
    templateUrl: './account-list.component.html'
})
export class AccountListComponent extends BaseEntityListComponent<Account> {


    accountTypes: { [id: number]: string; };


    displayedColumns = [
        'accountNo',
        'description',
        // 'accType',
        'analyzed',
        'customerCode',
        'ccRequired'
    ];

    constructor(
        public accountService: AccountService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(accountService, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LOGISTICS_ACCOUNTS');
        this.pagination.pageSize = 10;
    }

    preload(): Observable<any> {
        this.accountTypes = ACCOUNT_TYPES;
        return of(null);
    }
}
