import { Component, inject, OnInit } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Observable} from 'rxjs';
import {
    Summary,
    TreasuryBankExpenseService,
    TTransaction
} from '@ss/treasury/api-transactions';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {Journal, UserJournalsService} from '@ss/treasury/api-journal';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { MatDatepickerModule } from "@muaazh/angular-datepicker";
import { MatHint, MatFormField, MatLabel } from "@angular/material/form-field";
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatIconButton } from "@angular/material/button";
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from "@angular/material/table";
import { PaginationComponent } from '@ss/common/ui-pagination';
import { AsyncPipe, DecimalPipe } from "@angular/common";

@Component({
    selector: 'ss-bank-expense-list',
    templateUrl: './bank-expense-list.component.html',
    styleUrls: ['../transaction-list/transaction-list.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        MatDatepickerModule,
        MatHint,
        MatFormField,
        MatLabel,
        TranslateDirective,
        UiAutoCompleteComponent,
        FormsModule,
        ReactiveFormsModule,
        MatIconButton,
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
        AsyncPipe,
        DecimalPipe,
    ],
})
export class BankExpenseListComponent extends BaseEntityListComponent<TTransaction> implements OnInit {
    private journalSrv = inject(UserJournalsService);
    private readonly CASH_COLS =
        [
            "description",
            "agentName",
            "groupName",
            "income",
            "expenses",
            "pieceno",
            "groupName",
            "memo"
        ];

    private readonly BANK_COLS = [
        // 'reference',
        // 'reference2',
        'description',
        'agentName',
        'groupName',
        'income',
        'expenses',
        'pieceno',
        'groupName',
        'memo'
    ];

    dateFilter: FormControl<Date>    = null;
    journalFilter: FormControl<number | null> = null;
    journalLookup: DefaultAutoCompleteModel<Journal> = new DefaultAutoCompleteModel(this.journalSrv);
    summary$: Observable<Summary[]> = null;
    selectedJournal: string|null = null;
    displayedColumns = this.CASH_COLS;

    constructor(
        public override entitySrv: TreasuryBankExpenseService,
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
            'TRS_BANK_EXPENSES');
        this.displayedColumns = this.entitySrv?.isBank()? this.BANK_COLS: this.CASH_COLS;
        this.journalLookup.onObjectSelected = o => this.onJournal(o);
        this.dateFilter  = new FormControl<Date>(this.entitySrv.date);
        this.journalFilter = new FormControl<number>(this.entitySrv.journalId);
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

    onSummary(s: Summary) {
        this.selectedJournal = s.journal;
        this.openPeriod(s.period);
    }
    openPeriod(period: number) {
        const date = new Date(+(period / 10000).toFixed(0), +((period / 100) % 100).toFixed(0) - 1, +(period % 100).toFixed(0));
        this.onDate(date);
    }
}
