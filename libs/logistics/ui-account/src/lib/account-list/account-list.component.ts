import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LookupsService} from '@ss/common/api-lookup';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {Account, AccountService} from '@ss/accounting/api-accounts';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';

import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-account-list',
    styleUrls: ['./account-list.component.scss'],
    templateUrl: './account-list.component.html',
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        PaginationComponent,
    ]
})
export class AccountListComponent extends BaseEntityListComponent<Account> {
    displayedColumns = [
        'accountNo',
        'description',
        'budgetAccount',
        'analyzed',
        'customerCode',
        'ccRequired'
    ];

    constructor(
        public accountService: AccountService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(accountService, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LOGISTICS_ACCOUNTS');
        this.pagination.pageSize = 10;
    }
}
