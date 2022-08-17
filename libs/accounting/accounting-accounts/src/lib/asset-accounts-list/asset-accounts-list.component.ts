import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Account, AccountService} from '@ss/accounting/api-accounts';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {LookupsService} from '@ss/common/api-lookup';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {AssetAccountService} from '@ss/accounting/accounting-api';

@Component({
  selector: 'ss-asset-accounts-list',
  templateUrl: './asset-accounts-list.component.html',
  styleUrls: ['./asset-accounts-list.component.scss']
})
export class AssetAccountsListComponent extends BaseEntityListComponent<Account> {

    displayedColumns = [
        'accountNo',
        'description',
        'depreciation_account',
        'endowment_account',
        'depreciationRate',
        'usefulLife'
    ];

    constructor(
        public accountService: AssetAccountService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(accountService,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ACC_ASSET_ACCOUNTS');
    }
}
