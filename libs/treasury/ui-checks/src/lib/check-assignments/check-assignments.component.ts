import { Component, AfterViewInit, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
    MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
    MatTableDataSource,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { NativeDateModule } from '@muaazh/angular-datepicker';

import { ShellService } from '@ss/common/ui-shell';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationModel } from '@ss/common/api-common';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { Bank, BankService } from '@ss/administration/api-bank';
import { BankCheck, CheckService, UnassignedCheck } from '@ss/treasury/api-checks';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

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
        MatFormField, MatLabel, MatSuffix, MatInput, MatIconButton, DatePickerComponent, NativeDateModule,
        ReactiveFormsModule,
        TranslateDirective, DecimalPipe, DatePipe, PaginationComponent,
    ],
})
export class CheckAssignmentsComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly checkSrv        = inject(CheckService);
    private readonly bankSrv         = inject(BankService);
    private readonly shellSrv        = inject(ShellService);
    private readonly route           = inject(ActivatedRoute);
    private readonly confirmationSrv = inject(ConfirmationDialogService);

    private readonly subs = new Subscription();

    readonly dueDateCtrl = new FormControl<string>(new Date().toISOString().split('T')[0]);
    readonly bankSearchCtrl      = new FormControl<string>('');
    readonly bankCheckSearchCtrl = new FormControl<string>('');
    bankSearchOpen      = signal(false);
    bankCheckSearchOpen = signal(false);

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

    readonly unassignedPagination = PaginationModel.newInstance({ page: 1, pageSize: 10, elementCount: 0 });
    readonly bankPagination       = PaginationModel.newInstance({ page: 1, pageSize: 10, elementCount: 0 });
    readonly bankCheckPagination  = PaginationModel.newInstance({ page: 1, pageSize: 10, elementCount: 0 });

    readonly unassignedPage = signal<UnassignedCheck[]>([]);
    readonly banksPage      = signal<Bank[]>([]);
    readonly bankCheckPage  = signal<BankCheck[]>([]);

    private unassignedSorted: UnassignedCheck[] = [];
    private bankChecksSorted: BankCheck[] = [];
    private banksFiltered: Bank[] = [];
    private bankFilter = '';

    @ViewChild('unassignedSort') unassignedSort: MatSort;
    @ViewChild('bankCheckSort')  bankCheckSort: MatSort;

    ngOnInit(): void {
        this.shellSrv.setTitle('TRS_CHECK_ASSIGNMENTS');
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.enableSearch('COMMON_SEARCH', o =>
            o.subscribe((f: string) => {
                this.unassignedDataSource.filter = f.trim().toLowerCase();
                this.refreshUnassignedPage();
            })
        );

        this.unassignedDataSource.filterPredicate = (row: UnassignedCheck, filter: string) =>
            [row.number, row.bank, row.agentName].some(v => v?.toLowerCase().includes(filter));
        this.unassignedDataSource.sortingDataAccessor = (row: UnassignedCheck, property: string) =>
            property === 'due_date' ? row.date : (row as unknown as Record<string, string | number>)[property];
        this.bankCheckDataSource.filterPredicate = (row: BankCheck, filter: string) =>
            [row.number, row.bank].some(v => v?.toLowerCase().includes(filter));

        this.unassignedPagination.onChange = () => this.applyUnassignedPage();
        this.bankPagination.onChange       = () => this.applyBanksPage();
        this.bankCheckPagination.onChange  = () => this.applyBankCheckPage();

        this.bankSearchCtrl.valueChanges.subscribe(f => {
            this.bankFilter = (f || '').trim().toLowerCase();
            this.refreshBanksPage();
        });
        this.bankCheckSearchCtrl.valueChanges.subscribe(f => {
            this.bankCheckDataSource.filter = (f || '').trim().toLowerCase();
            this.refreshBankCheckPage();
        });

        this.loadUnassigned();
        this.loadBanks();
        this.dueDateCtrl.valueChanges.subscribe(() => this.loadUnassigned());
    }

    ngAfterViewInit(): void {
        this.unassignedDataSource.sort = this.unassignedSort;
        this.bankCheckDataSource.sort  = this.bankCheckSort;

        this.subs.add(this.unassignedSort.sortChange.subscribe(() => this.refreshUnassignedPage()));
        this.subs.add(this.bankCheckSort.sortChange.subscribe(() => this.refreshBankCheckPage()));
    }

    ngOnDestroy(): void {
        this.shellSrv.disableSearch(false);
        this.subs.unsubscribe();
    }

    private clampPage(pagination: PaginationModel): void {
        const lastPage = Math.max(1, Math.ceil(pagination.elementCount / pagination.pageSize));
        if (pagination.page > lastPage) {
            pagination.page = lastPage;
        }
    }

    private refreshUnassignedPage(): void {
        const sort = this.unassignedDataSource.sort;
        this.unassignedSorted = sort
            ? this.unassignedDataSource.sortData(this.unassignedDataSource.filteredData.slice(), sort)
            : this.unassignedDataSource.filteredData;
        this.unassignedPagination.elementCount = this.unassignedSorted.length;
        this.clampPage(this.unassignedPagination);
        this.applyUnassignedPage();
    }

    private refreshBankCheckPage(): void {
        const sort = this.bankCheckDataSource.sort;
        this.bankChecksSorted = sort
            ? this.bankCheckDataSource.sortData(this.bankCheckDataSource.filteredData.slice(), sort)
            : this.bankCheckDataSource.filteredData;
        this.bankCheckPagination.elementCount = this.bankChecksSorted.length;
        this.clampPage(this.bankCheckPagination);
        this.applyBankCheckPage();
    }

    private applyUnassignedPage(): void {
        const start = (this.unassignedPagination.page - 1) * this.unassignedPagination.pageSize;
        this.unassignedPage.set(this.unassignedSorted.slice(start, start + this.unassignedPagination.pageSize));
    }

    private applyBankCheckPage(): void {
        const start = (this.bankCheckPagination.page - 1) * this.bankCheckPagination.pageSize;
        this.bankCheckPage.set(this.bankChecksSorted.slice(start, start + this.bankCheckPagination.pageSize));
    }

    private refreshBanksPage(): void {
        this.banksFiltered = this.bankFilter
            ? this.banks().filter(b => b.description?.toLowerCase().includes(this.bankFilter))
            : this.banks();
        this.bankPagination.elementCount = this.banksFiltered.length;
        this.clampPage(this.bankPagination);
        this.applyBanksPage();
    }

    private applyBanksPage(): void {
        const start = (this.bankPagination.page - 1) * this.bankPagination.pageSize;
        this.banksPage.set(this.banksFiltered.slice(start, start + this.bankPagination.pageSize));
    }

    loadUnassigned(): void {
        this.loadingUnassigned.set(true);
        const date = this.dueDateCtrl.value || undefined;
        this.checkSrv.getUnassigned(date).subscribe({
            next: data => {
                this.unassignedDataSource.data = date
                    ? data.filter(c => c.date.slice(0, 10) >= date)
                    : data;
                this.refreshUnassignedPage();
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
                this.refreshBanksPage();
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
                this.refreshBankCheckPage();
                this.loadingBankChecks.set(false);
            },
            error: () => this.loadingBankChecks.set(false),
        });
    }

    onBankSelect(bankId: number): void {
        if (this.selectedBankId() === bankId) {
            this.selectedBankId.set(null);
            this.bankCheckDataSource.data = [];
            this.refreshBankCheckPage();
        } else {
            this.selectedBankId.set(bankId);
            this.loadBankChecks(bankId);
        }
    }

    assignOne(id: number): void {
        const bankId = this.selectedBankId();
        if (!bankId || this.assigning()) return;

        this.confirmationSrv.confirm(null, 'TRS_CONFIRM_ASSIGN_CHECK').subscribe(ok => {
            if (!ok) return;
            this.assigning.set(true);
            this.checkSrv.assignChecks(bankId, [id]).subscribe({
                next: () => {
                    this.assigning.set(false);
                    this.loadUnassigned();
                    this.loadBankChecks(bankId);
                },
                error: () => this.assigning.set(false),
            });
        });
    }

    assignAll(): void {
        const bankId = this.selectedBankId();
        const ids    = this.unassignedDataSource.filteredData.map(c => c.id);
        if (!bankId || ids.length === 0 || this.assigning()) return;

        this.confirmationSrv.confirm(null, 'TRS_CONFIRM_ASSIGN_CHECK').subscribe(ok => {
            if (!ok) return;
            this.assigning.set(true);
            this.checkSrv.assignChecks(bankId, ids).subscribe({
                next: () => {
                    this.assigning.set(false);
                    this.loadUnassigned();
                    this.loadBankChecks(bankId);
                },
                error: () => this.assigning.set(false),
            });
        });
    }

    removeOne(id: number): void {
        const bankId = this.selectedBankId();
        if (!bankId || this.removing()) return;

        this.confirmationSrv.confirm(null, 'TRS_CONFIRM_UNASSIGN_CHECK').subscribe(ok => {
            if (!ok) return;
            this.removing.set(true);
            this.checkSrv.unassignChecks([id]).subscribe({
                next: () => {
                    this.removing.set(false);
                    this.loadUnassigned();
                    this.loadBankChecks(bankId);
                },
                error: () => this.removing.set(false),
            });
        });
    }

    removeAll(): void {
        const bankId = this.selectedBankId();
        const ids    = this.bankCheckDataSource.filteredData.map(c => c.id);
        if (!bankId || ids.length === 0 || this.removing()) return;

        this.confirmationSrv.confirm(null, 'TRS_CONFIRM_UNASSIGN_CHECK').subscribe(ok => {
            if (!ok) return;
            this.removing.set(true);
            this.checkSrv.unassignChecks(ids).subscribe({
                next: () => {
                    this.removing.set(false);
                    this.loadUnassigned();
                    this.loadBankChecks(bankId);
                },
                error: () => this.removing.set(false),
            });
        });
    }
}
