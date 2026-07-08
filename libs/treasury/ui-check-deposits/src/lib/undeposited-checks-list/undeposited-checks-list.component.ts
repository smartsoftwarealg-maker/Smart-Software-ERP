import { AfterViewInit, Component, inject, Input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CheckDepositLine, CheckDepositLineService } from '@ss/treasury/api-check-deposits';
import { BankCheck, CheckService } from '@ss/treasury/api-checks';
import { dateTimeToStr, LoginService, PaginationModel } from '@ss/common/api-common';
import { SnackBarService } from '@ss/common/ui-shell';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { from, Subscription } from 'rxjs';
import { concatMap, toArray } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe, DatePipe } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
    MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell,
    MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow,
    MatTableDataSource
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-undeposited-checks-list',
    templateUrl: './undeposited-checks-list.component.html',
    styleUrls: ['./undeposited-checks-list.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        TranslateDirective,
        ReactiveFormsModule,
        MatCheckbox,
        MatProgressBar,
        MatFormField,
        MatSuffix,
        MatInput,
        MatIconButton,
        MatSort,
        MatSortHeader,
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
        DecimalPipe,
        DatePipe
    ]
})
export class UndepositedChecksListComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() bankId = 0;
    @Input() depositId = 0;

    private subscription: Subscription = null;
    private sorted: BankCheck[] = [];

    readonly searchCtrl = new FormControl<string>('');
    searchOpen = signal(false);
    loading = signal(false);
    adding = signal(false);

    readonly dataSource = new MatTableDataSource<BankCheck>();
    readonly displayedColumns = ['number', 'date', 'amount', 'select'];

    page = signal<BankCheck[]>([]);
    paginator = PaginationModel.newInstance();

    @ViewChild(MatSort) sort: MatSort;

    private loginSrv = inject(LoginService);

    constructor(private checkSrv: CheckService,
                private lineSrv: CheckDepositLineService,
                private snackBarSrv: SnackBarService,
                private confirmationSrv: ConfirmationDialogService) {}

    ngOnInit(): void {
        this.dataSource.filterPredicate = (row: BankCheck, filter: string) =>
            row.number?.toLowerCase().includes(filter);

        this.paginator.onChange = () => this.applyPage();
        this.searchCtrl.valueChanges.subscribe(f => {
            this.dataSource.filter = (f || '').trim().toLowerCase();
            this.refreshPage();
        });
        this.subscription = this.lineSrv.changed$.subscribe(() => this.refresh());
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.subscription.add(this.sort.sortChange.subscribe(() => this.refreshPage()));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['bankId']) {
            this.refresh();
        }
    }

    private refresh() {
        if (!this.bankId) {
            this.dataSource.data = [];
            this.refreshPage();
            return;
        }
        this.loading.set(true);
        this.checkSrv.getUndepositedChecks(this.bankId).subscribe({
            next: list => {
                this.dataSource.data = list;
                this.refreshPage();
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }

    private refreshPage() {
        const sort = this.dataSource.sort;
        this.sorted = sort
            ? this.dataSource.sortData(this.dataSource.filteredData.slice(), sort)
            : this.dataSource.filteredData;
        this.paginator.elementCount = this.sorted.length;
        this.applyPage();
    }

    private applyPage() {
        const start = (this.paginator.page - 1) * this.paginator.pageSize;
        this.page.set(this.sorted.slice(start, start + this.paginator.pageSize));
    }

    private buildLine(check: BankCheck): CheckDepositLine {
        return {
            id: 0,
            depositId: this.depositId,
            checkId: check.id,
            createdBy: this.loginSrv.appCtx.id,
            createdAt: dateTimeToStr(new Date()),
            number: check.number,
            date: check.date,
            amount: check.amount
        };
    }

    addOne(check: BankCheck) {
        if (!this.depositId || this.adding()) {
            return;
        }
        this.confirmationSrv.confirm(null, 'TRS_CONFIRM_DEPOSIT_CHECK').subscribe(ok => {
            if (!ok) {
                return;
            }
            this.adding.set(true);
            this.lineSrv.setParentId(this.depositId);
            this.lineSrv.save(this.buildLine(check))
                .subscribe({
                    next: () => {
                        this.adding.set(false);
                        this.snackBarSrv.showSuccessMessage();
                        this.lineSrv.notifyChanged();
                    },
                    error: err => {
                        this.adding.set(false);
                        this.snackBarSrv.showFailureMessage();
                        throw err;
                    }
                });
        });
    }

    addAll() {
        const checks = this.dataSource.filteredData;
        if (!this.depositId || checks.length === 0 || this.adding()) {
            return;
        }
        this.confirmationSrv.confirm(null, 'TRS_CONFIRM_DEPOSIT_CHECK').subscribe(ok => {
            if (!ok) {
                return;
            }
            this.adding.set(true);
            this.lineSrv.setParentId(this.depositId);
            from(checks).pipe(
                concatMap(check => this.lineSrv.save(this.buildLine(check))),
                toArray()
            ).subscribe({
                next: () => {
                    this.adding.set(false);
                    this.snackBarSrv.showSuccessMessage();
                    this.lineSrv.notifyChanged();
                },
                error: err => {
                    this.adding.set(false);
                    this.snackBarSrv.showFailureMessage();
                    this.lineSrv.notifyChanged();
                    throw err;
                }
            });
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
