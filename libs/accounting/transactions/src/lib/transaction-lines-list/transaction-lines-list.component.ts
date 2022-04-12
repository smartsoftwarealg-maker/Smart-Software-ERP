import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {AccJournalsService, ACCTransaction, AccTransactionService, Journal} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
  selector: 'ss-transaction-lines-list',
  templateUrl: './transaction-lines-list.component.html',
  styleUrls: ['./transaction-lines-list.component.scss']
})
export class TransactionLinesListComponent extends BaseEntityListComponent<ACCTransaction> implements OnInit {
    journalList: Journal[] = [];

    constructor(
        public override entitySrv: AccTransactionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private journalSrv: AccJournalsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'ADMINISTRATION_BANK');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.journalSrv
            .getList(0, 50)
            .subscribe(res => this.journalList = res.body);
    }
}
