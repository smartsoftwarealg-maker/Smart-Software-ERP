import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {
    AccJournalsService,
    ACCTransaction,
    ACCTransactionLine, AccTransactionLineService,
    AccTransactionService,
    Journal
} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService, Right} from '@ss/common/api-common';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'ss-transaction-lines-list',
  templateUrl: './transaction-lines-list.component.html',
  styleUrls: ['./transaction-lines-list.component.scss']
})
export class TransactionLinesListComponent extends BaseEntityListComponent<ACCTransactionLine> implements OnInit {
    displayedColumns = ['accountNo', 'description', 'reference', 'debit', 'credit'];

    constructor(
        public override entitySrv: AccTransactionLineService,
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
              'ADMINISTRATION_BANK');
    }

    override ngOnInit() {
        this.route
            .params
            .subscribe(p => {
                this.entitySrv.setParentId(+p['id']);
                console.log('id', this.entitySrv.getParentId())
                super.refresh();
            })
    }

    override selectRow(row: ACCTransactionLine) {
        row.id = (row.fileId * 10000 + row.oid) * 10000 + row.lineNumber;
        super.selectRow(row);
    }
}
