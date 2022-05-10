import {Component} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {
    AnnexCode,
    AnnexCodeService,
    CashFlowAccountService,
    PendingTreasury,
    TreasuryInfo
} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {switchMap, tap} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ss-cashflow-accounts-list',
  templateUrl: './cash-flow-list.component.html',
  styleUrls: ['./cash-flow-list.component.scss']
})
export class CashFlowListComponent extends BaseEntityListComponent<AnnexCode> {
    selectedId = 0;
    selectedCode = '';
    pendingData: PendingTreasury[] = [];
    infoData: TreasuryInfo = { total: 0, located: 0, nonLocated: 0 };
    pendingColumns = ['add', 'accountNo', 'description', 'debit', 'credit'];
    total = new FormControl();
    located = new FormControl();
    nonLocated = new FormControl();

    constructor(
        public override entitySrv: AnnexCodeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private cashFlowSrv: CashFlowAccountService) {
        super(entitySrv,
              shellSrv,
              snackBarSrv,
              route,
              router,
              confirmationSrv,
              defReportSrv,
              pagPersistSrv,
            'ACC_CASH_FLOW');
        this.pagination.pageSize = 20;
    }

    selectItem(annex: AnnexCode) {
        this.selectedId = annex?.id;
        this.selectedCode = annex?.code;
    }

    refreshPending() {
        this.shellSrv.setLoading(true)
        this.cashFlowSrv
            .info(false)
            .pipe(tap(res => {
                    this.infoData = res;
                    this.total.setValue(res.total.toLocaleString());
                    this.located.setValue(res.located.toLocaleString());
                    this.nonLocated.setValue(res.nonLocated.toLocaleString());
                }),
                switchMap(_ => this.cashFlowSrv.pending('', false)))
            .subscribe({
                next: res => {
                    this.pendingData = res;
                    this.shellSrv.setLoading(false);
                },
                error: err => this.shellSrv.setLoading(false)
            });
    }

    add(e: PendingTreasury) {
        console.log(e);
    }
}
