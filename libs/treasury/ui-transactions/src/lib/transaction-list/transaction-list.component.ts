import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {TreasuryTransactionService, TTransaction} from '@ss/treasury/api-transactions';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {FormControl, UntypedFormGroup} from '@angular/forms';
import {Journal, JournalService} from '@ss/treasury/api-journal';
import {DefaultAutoCompleteModel, Id} from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent extends BaseEntityListComponent<TTransaction> {
    private readonly CASH_COLS = [
        'description',
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
        'groupName',
        'income',
        'expenses',
        'pieceno',
        'groupName',
        'memo'];

    dateFilter    = new FormControl<Date>(new Date());
    journalFilter = new FormControl<number>(this.entitySrv.journalId);
    journalLookup = new DefaultAutoCompleteModel(this.journalSrv);

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
        private journalSrv: JournalService) {
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

    private onJournal(journal: Journal) {
        this.entitySrv.journal = journal;
        this.displayedColumns = this.entitySrv.isBank()? this.BANK_COLS : this.CASH_COLS;
        this.refresh();
    }

    public onDate(date: Date) {
        this.entitySrv.period = date;
        this.refresh();
    }
}
