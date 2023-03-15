import {Component, OnInit} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Summary, TreasuryTransactionService, TTransaction} from '@ss/treasury/api-transactions';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {FormControl} from '@angular/forms';
import {Journal, UserJournalsService} from '@ss/treasury/api-journal';
import {DefaultAutoCompleteModel, Id} from '@ss/common/ui-auto-complete';
import {Observable} from 'rxjs';

@Component({
    selector: 'ss-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent extends BaseEntityListComponent<TTransaction> implements OnInit {
    private readonly CASH_COLS = [
        'description',
        'agentName',
        'groupName',
        'income',
        'expenses',
        'pieceno',
        'groupName',
        'memo'];

    private readonly BANK_COLS = [
        'reference',
        'reference2',
        'description',
        'agentName',
        'groupName',
        'income',
        'expenses',
        'pieceno',
        'groupName',
        'memo'];

    dateFilter    = new FormControl<Date>(this.entitySrv.date);
    journalFilter = new FormControl<number>(this.entitySrv.journalId);
    journalLookup = new DefaultAutoCompleteModel(this.journalSrv);
    summary$: Observable<Summary[]> = null;

    displayedColumns = this.entitySrv?.isBank()? this.BANK_COLS: this.CASH_COLS;

    constructor(
        public override entitySrv: TreasuryTransactionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private journalSrv: UserJournalsService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_TRANSACTIONS');
        this.journalLookup.onObjectSelected = o => this.onJournal(o);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.summary$ = this.entitySrv.summary();
    }

    private onJournal(journal: Journal) {
        this.entitySrv.journal = journal;
        this.displayedColumns = this.entitySrv.isBank()? this.BANK_COLS : this.CASH_COLS;
        this.refresh();
        this.summary$ = this.entitySrv.summary();
    }

    public onDate(date: Date) {
        this.entitySrv.period = date;
        this.refresh();
    }

    protected override canShowProcessingStatus(): boolean {
        return false;
    }

    openPeriod(period: number) {
        const date = new Date(+(period / 10000).toFixed(0), +((period / 100) % 100).toFixed(0) - 1, +(period % 100).toFixed(0));
        this.onDate(date);
    }
}
