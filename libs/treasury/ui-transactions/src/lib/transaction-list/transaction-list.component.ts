import { Component, inject, OnInit, signal } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Summary, TreasuryTransactionService, TTransaction} from '@ss/treasury/api-transactions';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { APP_TREASURY, PaginatorPersistenceService } from "@ss/common/api-common";
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Journal, UserJournalsService} from '@ss/treasury/api-journal';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Observable} from 'rxjs';
import { MatRadioChange } from '@angular/material/radio';
import { AppArchiveService } from '@ss/common/app-archive';
import { MatCard } from '@angular/material/card';
import { MatDatepickerModule } from '@muaazh/angular-datepicker';
import { MatHint, MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { NgIf, NgFor, AsyncPipe, DecimalPipe } from '@angular/common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';
import { AppArchiveMainComponent } from '../../../../../common/app-archive/src/lib/app-archive-main/app-archive-main.component';

@Component({
    selector: 'ss-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatDatepickerModule,
        MatHint,
        MatFormField,
        MatLabel,
        TranslateDirective,
        UiAutoCompleteComponent,
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgFor,
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        AppArchiveMainComponent,
        AsyncPipe,
        DecimalPipe,
    ],
})
export class TransactionListComponent extends BaseEntityListComponent<TTransaction> implements OnInit {
    #archiveSrv = inject(AppArchiveService);
    #journalSrv = inject(UserJournalsService);

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

    dateFilter    = new FormControl<Date>(new Date());
    journalFilter = new FormControl<number>(0);
    journalLookup = new DefaultAutoCompleteModel(this.#journalSrv);
    summary$: Observable<Summary[]> = null;
    displayedColumns = this.CASH_COLS;
    mode: 1|2 = 1;
    TREASURY = APP_TREASURY;
    selectedPeriod = signal(0);

    constructor(
        public override entitySrv: TreasuryTransactionService,
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
            'COMMON_TRANSACTIONS');
        this.displayedColumns = this.entitySrv?.isBank()? this.BANK_COLS: this.CASH_COLS;
        this.journalLookup.onObjectSelected = o => this.onJournal(o);
        this.dateFilter.setValue(this.entitySrv.date);
        this.journalFilter.setValue(this.entitySrv.journalId);
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
        this.selectedPeriod.set(period);
        const date = new Date(+(period / 10000).toFixed(0), +((period / 100) % 100).toFixed(0) - 1, +(period % 100).toFixed(0));
        this.onDate(date);
    }

    onMode(e: MatRadioChange) {
        this.mode = +e.value === 2? 2 : 1;
    }

    //
    // override selectRow(row: TTransaction) {
    //     super.selectRow(row);
    //     this.#archiveSrv.setParentId(row?.id||0);
    // }
}
