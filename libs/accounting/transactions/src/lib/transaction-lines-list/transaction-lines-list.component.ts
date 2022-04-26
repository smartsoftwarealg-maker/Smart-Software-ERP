import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {
    ACCTransactionLine, AccTransactionLineService
} from '@ss/accounting/accounting-api';
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
export class TransactionLinesListComponent extends BaseEntityListComponent<ACCTransactionLine> implements OnInit {
    displayedColumns = [
        'lineNumber',
        'accountNo',
        'description',
        'customerName',
        'reference',
        'c_o_d',
        'debit',
        'credit'
    ];

    parentId: number = null;

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
              'ACC_TRANSAC_DETAIL');
    }

    override ngOnInit() {
        this.route
            .params
            .subscribe(p => {
                this.parentId = +p['id'];
                this.entitySrv.setParentId(this.parentId);
                super.ngOnInit();
            })
    }

    override selectRow(row: ACCTransactionLine) {
        row.id = (row.fileId * 10000 + row.oid) * 10000 + row.lineNumber;
        super.selectRow(row);
    }
}
