import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {AccJournalsService, ACCTransaction, Journal} from '@ss/accounting/accounting-api';
import {AccTransactionService} from '../../../../accounting-api/src/lib/acc-transaction.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {MatSelectionListChange} from '@angular/material/list';

@Component({
  selector: 'ss-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent extends BaseEntityListComponent<ACCTransaction> implements OnInit {
    journalList: Journal[] = [];
    displayedColumns = ['pieceno', 'piecedate']

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
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'ACC_TRANSACTIONS');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.journalSrv
            .getList(0, 50)
            .subscribe(res => this.journalList = res.body);
    }


    // addDetail() {
    //     this.router.navigate(['0'], { relativeTo: this.route });
    // }
    //
    // showDetail() {
    //     this.router.navigate(['detail'], { relativeTo: this.route });
    // }
    //
    // showDetailDetail() {
    //     this.router.navigate(['detail', 'detail'], { relativeTo: this.route });
    // }

    journalSelected(event: MatSelectionListChange) {
        this.entitySrv
            .findByJournal(event.options[0].value, this.pagination.page, this.pagination.pageSize)
            .subscribe(res => {
                this.data = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }
}
