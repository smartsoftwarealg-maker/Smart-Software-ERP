import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {GenerationAccount, GenerationAccountService} from '@ss/accounting/api-accounts';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
  selector: 'ss-generation-accounts-list',
  templateUrl: './generation-accounts-list.component.html',
  styleUrls: ['./generation-accounts-list.component.scss']
})
export class GenerationAccountsListComponent extends BaseEntityListComponent<GenerationAccount> {

    displayedColumns = [
        'description',
        'purchase',
        'supplier',
        'stock',
        'consumption',
        'sales'
    ];


    constructor(
        public override entitySrv: GenerationAccountService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ACC_STOCK_ACCOUNTS');
        this.pagination.pageSize = 15;
    }

}
