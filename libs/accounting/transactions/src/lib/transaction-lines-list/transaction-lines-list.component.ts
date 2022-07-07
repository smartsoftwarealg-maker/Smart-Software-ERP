import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {
    AccPoliciesService, ACCPolicy,
    ACCTransactionLine, AccTransactionLineService
} from '@ss/accounting/accounting-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService, PaginatorPersistenceService} from '@ss/common/api-common';
import {switchMap, tap} from 'rxjs';

@Component({
  selector: 'ss-transaction-lines-list',
  templateUrl: './transaction-lines-list.component.html',
  styleUrls: ['./transaction-lines-list.component.scss']
})
export class TransactionLinesListComponent extends BaseEntityListComponent<ACCTransactionLine> implements OnInit {
    private accPolicy: ACCPolicy = null;
    private exitButton: ToolbarButton = {
        icon: 'fa-solid fa-person-from-portal',
        label: 'COMMON_EXIT',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => {
            this.shellSrv.goBack();
            this.shellSrv.updateShell();
        }
    };
    private COLUMNS = [
        'lineNumber',
        'accountNo',
        'description',
        'customer',
        'reference',
        'c_o_d',
        'debit',
        'credit'];
    displayedColumns = this.COLUMNS;

    parentId: number = null;

    constructor(
        public override entitySrv: AccTransactionLineService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private loginSrv: LoginService,
        private policySrv: AccPoliciesService) {
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
        this.loginSrv
            .loadContext()
            .pipe(switchMap(_ => this.policySrv.get(this.loginSrv.appCtx.center)),
                  tap(res => this.accPolicy = res),
                  tap(_ => this.displayedColumns = this.COLUMNS.filter(e => this.accPolicy?.manualCashFlow || e !== 'c_o_d')),
                  switchMap(_ => this.route.params))
            .subscribe(p => {
                this.parentId = +p['id'];
                this.entitySrv.setParentId(this.parentId);
                super.ngOnInit();
                this.shellSrv.addButton(this.exitButton);
            });
    }

    override selectRow(row: ACCTransactionLine) {
        row.id = (row.fileId * 10000 + row.oid) * 10000 + row.lineNumber;
        super.selectRow(row);
    }

    protected override canShowProcessingStatus(): boolean {
        return false;
    }
}
