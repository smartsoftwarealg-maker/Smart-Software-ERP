import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LookupsService} from "@ss/common/api-lookup";
import {Observable, of} from "rxjs";
import {Account, AccountService} from "@ss/logistics/api-account";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {ACCOUNT_TYPES} from "@ss/logistics/api-account";
import {DefaultReportService} from '@ss/common/ui-default-report-component';

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
        'accType',
        'analyzed',
        'customerCode'
    ];

    constructor(
        public accountService: AccountService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService) {
        super(accountService, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'LOGISTICS_ACCOUNTS');
    }

    preload(): Observable<any> {
        this.accountTypes = ACCOUNT_TYPES;
        return of(null);
    }
}
