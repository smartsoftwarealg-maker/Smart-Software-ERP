import { Component, AfterViewInit, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import {
    MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
    MatTableDataSource,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { NativeDateModule } from '@muaazh/angular-datepicker';

import { ShellService } from '@ss/common/ui-shell';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Bank, BankService } from '@ss/administration/api-bank';
import { BankCheck, CheckService, UnassignedCheck } from '@ss/treasury/api-checks';

@Component({
    selector: 'ss-check-assignments',
    templateUrl: './check-assignments.component.html',
    styleUrls: ['./check-assignments.component.scss'],
    standalone: true,
    imports: [
        MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell,
        MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow,
        MatSort, MatSortHeader,
        MatCheckbox, MatProgressBar,
        MatFormField, MatLabel, DatePickerComponent, NativeDateModule,
        ReactiveFormsModule,
        TranslateDirective, DecimalPipe, DatePipe,
    ],
})
export class CheckAssignmentsComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly checkSrv  = inject(CheckService);
    private readonly bankSrv   = inject(BankService);
    private readonly shellSrv  = inject(ShellService);
    private readonly route     = inject(ActivatedRoute);

    readonly dueDateCtrl = new FormControl<string>(new Date().toISOString().split('T')[0]);

    readonly unassignedDataSource = new MatTableDataSource<UnassignedCheck>();
    readonly bankCheckDataSource  = new MatTableDataSource<BankCheck>();

    banks          = signal<Bank[]>([]);
    selectedBankId = signal<number | null>(null);

    loadingUnassigned = signal(false);
    loadingBanks      = signal(false);
    loadingBankChecks = signal(false);
    assigning         = signal(false);
    removing          = signal(false);

    readonly unassignedColumns = ['number', 'bank', 'due_date', 'amount', 'select'];
    readonly bankColumns       = ['description'];
    readonly bankCheckColumns  = ['number', 'bank', 'date', 'amount', 'select'];

    @ViewChild('unassignedSort') unassignedSort: MatSort;
    @ViewChild('bankCheckSort')  bankCheckSort: MatSort;

    ngOnInit(): void {
        this.shellSrv.setTitle('TRS_CHECK_ASSIGNMENTS');
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.enableSearch('COMMON_SEARCH', o =>
            o.subscribe((f: string) => {
                this.unassignedDataSource.filter = f.trim().toLowerCase();
            })
        );
        this.unassignedDataSource.filterPredicate = (row: UnassignedCheck, filter: string) =>
            [row.number, row.bank, row.agentName].some(v => v?.toLowerCase().includes(filter));
        this.unassignedDataSource.sortingDataAccessor = (row: UnassignedCheck, property: string) =>
            property === 'due_date' ? row.date : (row as unknown as Record<string, string | number>)[property];

        this.loadUnassigned();
        this.loadBanks();
        this.dueDateCtrl.valueChanges.subscribe(() => this.loadUnassigned());
    }

    ngAfterViewInit(): void {
        this.unassignedDataSource.sort = this.unassignedSort;
        this.bankCheckDataSource.sort  = this.bankCheckSort;
    }

    ngOnDestroy(): void {
        this.shellSrv.disableSearch(false);
    }

    loadUnassigned(): void {
        this.loadingUnassigned.set(true);
        const date = this.dueDateCtrl.value || undefined;
        this.checkSrv.getUnassigned(date).subscribe({
            next: data => {
                this.unassignedDataSource.data = data.filter(c => !c.parentId);
                this.loadingUnassigned.set(false);
            },
            error: () => this.loadingUnassigned.set(false),
        });
    }

    loadBanks(): void {
        this.loadingBanks.set(true);
        this.bankSrv.getListSimple().subscribe({
            next: data => {
                this.banks.set(data);
                this.loadingBanks.set(false);
            },
            error: () => this.loadingBanks.set(false),
        });
    }

    loadBankChecks(bankId: number): void {
        this.loadingBankChecks.set(true);
        this.checkSrv.getBankChecks(bankId).subscribe({
            next: data => {
                this.bankCheckDataSource.data = data;
                this.loadingBankChecks.set(false);
            },
            error: () => this.loadingBankChecks.set(false),
        });
    }

    // ── Bank selection ────────────────────────────────────────────────────────

    onBankSelect(bankId: number): void {
        if (this.selectedBankId() === bankId) {
            this.selectedBankId.set(null);
            this.bankCheckDataSource.data = [];
        } else {
            this.selectedBankId.set(bankId);
            this.loadBankChecks(bankId);
        }
    }

    // ── Assign (checkbox-driven, one check at a time) ───────────────────────────

    assignOne(id: number): void {
        const bankId = this.selectedBankId();
        if (!bankId || this.assigning()) return;

        this.assigning.set(true);
        this.checkSrv.assignChecks(bankId, [id]).subscribe({
            next: () => {
                this.assigning.set(false);
                this.loadUnassigned();
                this.loadBankChecks(bankId);
            },
            error: () => this.assigning.set(false),
        });
    }

    assignAll(): void {
        const bankId = this.selectedBankId();
        const ids    = this.unassignedDataSource.filteredData.map(c => c.id);
        if (!bankId || ids.length === 0 || this.assigning()) return;

        this.assigning.set(true);
        this.checkSrv.assignChecks(bankId, ids).subscribe({
            next: () => {
                this.assigning.set(false);
                this.loadUnassigned();
                this.loadBankChecks(bankId);
            },
            error: () => this.assigning.set(false),
        });
    }

    // ── Remove assignment (checkbox-driven, one check at a time) ────────────────

    removeOne(id: number): void {
        const bankId = this.selectedBankId();
        if (!bankId || this.removing()) return;

        this.removing.set(true);
        this.checkSrv.unassignChecks([id]).subscribe({
            next: () => {
                this.removing.set(false);
                this.loadUnassigned();
                this.loadBankChecks(bankId);
            },
            error: () => this.removing.set(false),
        });
    }

    removeAll(): void {
        const bankId = this.selectedBankId();
        const ids    = this.bankCheckDataSource.filteredData.map(c => c.id);
        if (!bankId || ids.length === 0 || this.removing()) return;

        this.removing.set(true);
        this.checkSrv.unassignChecks(ids).subscribe({
            next: () => {
                this.removing.set(false);
                this.loadUnassigned();
                this.loadBankChecks(bankId);
            },
            error: () => this.removing.set(false),
        });
    }
}
