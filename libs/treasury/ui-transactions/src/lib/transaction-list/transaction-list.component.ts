import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Summary, TImport, TreasuryTransactionService, TTransaction } from '@ss/treasury/api-transactions';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { APP_TREASURY, PaginatorPersistenceService } from '@ss/common/api-common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Journal, UserJournalsService } from '@ss/treasury/api-journal';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { Observable } from 'rxjs';
import { MatRadioChange } from '@angular/material/radio';
import { MatCard } from '@angular/material/card';
import { MatDatepickerModule } from '@muaazh/angular-datepicker';
import { MatHint, MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatCellDef, MatHeaderCellDef, MatHeaderRowDef, MatRowDef
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { AppArchiveMainComponent } from '@ss/common/app-archive';
import { TransactionImportComponent } from '../transaction-import/transaction-import.component';
import { MatDialog } from '@angular/material/dialog';

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
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderRow,
        MatRow,
        PaginationComponent,
        AppArchiveMainComponent,
        AsyncPipe,
        DecimalPipe,
        MatCellDef,
        MatHeaderCellDef,
        MatHeaderRowDef,
        MatRowDef
    ]
})
export class TransactionListComponent extends BaseEntityListComponent<TTransaction> implements OnInit {
    #journalSrv = inject(UserJournalsService);

    private readonly CASH_COLS = [
        'description',
        'agentName',
        'income',
        'expenses',
        'pieceno',
        'groupName',
        'costCenterDescription',
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

    dateFilter = new FormControl<Date>(new Date());
    journalFilter = new FormControl<number>(0);
    journalLookup = new DefaultAutoCompleteModel(this.#journalSrv);
    summary$: Observable<Summary[]> = null;
    displayedColumns = this.CASH_COLS;
    mode: 1 | 2 = 1;
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
        private dialog: MatDialog,
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
        this.displayedColumns = this.entitySrv?.isBank() ? this.BANK_COLS : this.CASH_COLS;
        this.journalLookup.onObjectSelected = o => this.onJournal(o);
        this.dateFilter.setValue(this.entitySrv.date);
        this.journalFilter.setValue(this.entitySrv.journalId);
        this.invImportBtn.disabled = !(this.entitySrv.journal);

    }

    private invImportBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.openImportDialog()
    };

    override ngOnInit() {
        super.ngOnInit();
        this.summary$ = this.entitySrv.summary();
        this.shellSrv.addButton(this.invImportBtn);
    }

    private onJournal(journal: Journal) {
        this.entitySrv.journal = journal;
        this.invImportBtn.disabled = !journal;
        this.displayedColumns = this.entitySrv.isBank() ? this.BANK_COLS : this.CASH_COLS;
        this.refresh();
        this.summary$ = this.entitySrv.summary();
    }

    openImportDialog() {
        if (!this.invImportBtn.disabled) {
            const importData: TImport = {
                journal: this.entitySrv.journal?.id ?? 0,
                date: new Date(),
                from: new Date(),
                to: new Date(),
                consolidated: false
            };

            const dialogRef = this.dialog.open(TransactionImportComponent, {
                width: '650px',
                height: '340px',
                disableClose: true,
                data: {
                    importData: importData
                }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result.success) {
                    this.snackBarSrv.showMessage('COMMON_SUCCESS');
                    this.entitySrv.import(result.importData).subscribe({
                        next: () => {
                            this.refresh();
                        },
                        error: () => {
                            this.snackBarSrv.showFailureMessage();
                        }
                    });

                } else {
                    this.snackBarSrv.showFailureMessage();
                }
                this.shellSrv.setLoading(false);
            });
        }
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
        this.mode = +e.value === 2 ? 2 : 1;
    }

    override selectRow(row: TTransaction) {
        super.selectRow(row);
        this.selectedRow = row;

    }


}
