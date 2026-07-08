import {
    AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit,
    signal, SimpleChanges, ChangeDetectionStrategy, ViewChild
} from '@angular/core';
import { CheckDepositLineService, CheckDepositLine } from '@ss/treasury/api-check-deposits';
import { Check, CheckService } from '@ss/treasury/api-checks';
import { PaginationModel } from '@ss/common/api-common';
import { SnackBarService } from '@ss/common/ui-shell';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { forkJoin, from, Observable, of, Subscription } from 'rxjs';
import { concatMap, map, switchMap, toArray } from 'rxjs/operators';
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
    selector: 'ss-check-deposit-line-list',
    templateUrl: './check-deposit-line-list.component.html',
    styleUrls: ['./check-deposit-line-list.component.scss'],
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
export class CheckDepositLineListComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() parentId = 0;

    private subscription: Subscription = null;
    private sorted: CheckDepositLine[] = [];

    readonly searchCtrl = new FormControl<string>('');
    searchOpen = signal(false);
    loading = signal(false);
    removing = signal(false);

    readonly dataSource = new MatTableDataSource<CheckDepositLine>();
    readonly displayedColumns = ['checkNumber', 'date', 'amount', 'select'];

    page = signal<CheckDepositLine[]>([]);
    paginator = PaginationModel.newInstance();

    @ViewChild(MatSort) sort: MatSort;

    constructor(private entitySrv: CheckDepositLineService,
                private checkSrv: CheckService,
                private snackBarSrv: SnackBarService,
                private confirmationSrv: ConfirmationDialogService) {}

    ngOnInit(): void {
        this.dataSource.filterPredicate = (row: CheckDepositLine, filter: string) =>
            row.checkNumber?.toLowerCase().includes(filter);

        this.paginator.onChange = () => this.refreshPage();
        this.searchCtrl.valueChanges.subscribe(f => {
            this.dataSource.filter = (f || '').trim().toLowerCase();
            this.refreshPage();
        });
        this.subscription = this.entitySrv.changed$.subscribe(() => this.refresh());
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.subscription.add(this.sort.sortChange.subscribe(() => this.refreshPage()));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['parentId']) {
            this.entitySrv.setParentId(this.parentId);
            this.refresh();
        }
    }

    private enrich(lines: CheckDepositLine[]): Observable<CheckDepositLine[]> {
        const checkIds = [...new Set(lines.map(l => l.checkId).filter(id => !!id))];
        if (checkIds.length === 0) {
            return of(lines);
        }
        return forkJoin(checkIds.map(id => this.checkSrv.get(id))).pipe(
            map((checks: Check[]) => {
                const byId = new Map(checks.map(c => [c.id, c]));
                return lines.map(l => ({
                    ...l,
                    date: l.date ?? byId.get(l.checkId)?.date
                }));
            })
        );
    }

    private refresh() {
        if (!this.parentId) {
            this.dataSource.data = [];
            this.refreshPage();
            return;
        }
        this.loading.set(true);
        this.entitySrv
            .getListSimple()
            .pipe(switchMap(lines => this.enrich(lines)))
            .subscribe({
                next: lines => {
                    this.dataSource.data = lines;
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

    removeOne(id: number) {
        if (this.removing()) {
            return;
        }
        this.confirmationSrv.confirm(null, 'TRS_CONFIRM_UNDEPOSIT_CHECK').subscribe(ok => {
            if (!ok) {
                return;
            }
            this.removing.set(true);
            this.entitySrv.remove(id).subscribe({
                next: () => {
                    this.removing.set(false);
                    this.snackBarSrv.showSuccessMessage();
                    this.entitySrv.notifyChanged();
                },
                error: err => {
                    this.removing.set(false);
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                }
            });
        });
    }

    removeAll() {
        const ids = this.dataSource.filteredData.map(l => l.id);
        if (ids.length === 0 || this.removing()) {
            return;
        }
        this.confirmationSrv.confirm(null, 'TRS_CONFIRM_UNDEPOSIT_CHECK').subscribe(ok => {
            if (!ok) {
                return;
            }
            this.removing.set(true);
            from(ids).pipe(
                concatMap(id => this.entitySrv.remove(id)),
                toArray()
            ).subscribe({
                next: () => {
                    this.removing.set(false);
                    this.snackBarSrv.showSuccessMessage();
                    this.entitySrv.notifyChanged();
                },
                error: err => {
                    this.removing.set(false);
                    this.snackBarSrv.showFailureMessage();
                    this.entitySrv.notifyChanged();
                    throw err;
                }
            });
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
