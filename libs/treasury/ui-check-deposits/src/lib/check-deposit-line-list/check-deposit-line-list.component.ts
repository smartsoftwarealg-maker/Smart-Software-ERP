import { Component, OnDestroy, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CheckDepositLineService, CheckDepositLine } from '@ss/treasury/api-check-deposits';
import { Check, CheckService } from '@ss/treasury/api-checks';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PaginationModel } from '@ss/common/api-common';
import { SnackBarService } from '@ss/common/ui-shell';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DecimalPipe, DatePipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
    MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell,
    MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-check-deposit-line-list',
    templateUrl: './check-deposit-line-list.component.html',
    styleUrls: ['./check-deposit-line-list.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        TranslateDirective,
        MatMiniFabButton,
        MatTooltip,
        MatFormField,
        MatLabel,
        MatInput,
        FormsModule,
        ReactiveFormsModule,
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
        DatePipe,
        TranslatePipe
    ]
})
export class CheckDepositLineListComponent implements OnInit, OnDestroy {
    private subscription: Subscription = null;
    parentId = 0;
    id = 0;
    searchText = new FormControl<string>('');
    data = signal<CheckDepositLine[]>([]);
    paginator = PaginationModel.newInstance();
    readonly displayedColumns = ['checkNumber', 'bankDescription', 'date', 'amount'];

    constructor(private entitySrv: CheckDepositLineService,
                private checkSrv: CheckService,
                private snackBarSrv: SnackBarService,
                private confirmationSrv: ConfirmationDialogService,
                private route: Router,
                private router: ActivatedRoute) {}

    ngOnInit(): void {
        this.paginator.onChange = () => this.refresh();
        this.subscription = this.router
            .parent
            .parent
            .params
            .pipe(switchMap(res => {
                this.parentId = +res['id'] || 0;
                this.entitySrv.setParentId(this.parentId);
                return this.entitySrv.getList(this.paginator.page - 1, this.paginator.pageSize, this.searchText.value);
            }),
            switchMap(res => this.enrich(res.body).pipe(map(body => ({ body, itemCount: res.itemCount })))))
            .subscribe(res => {
                this.data.set(res.body);
                this.paginator.elementCount = res.itemCount;
            });

        this.subscription.add(
            this.searchText
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    switchMap(_ => this.entitySrv.getList(this.paginator.page - 1, this.paginator.pageSize, this.searchText.value)),
                    switchMap(res => this.enrich(res.body).pipe(map(body => ({ body, itemCount: res.itemCount }))))
                )
                .subscribe(res => {
                    this.data.set(res.body);
                    this.paginator.elementCount = res.itemCount;
                }));
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

    select(id: number) {
        this.id = id;
    }

    showDetail(id: number) {
        this.route.navigate([id], { relativeTo: this.router }).then();
    }

    edit() {
        if (this.id) {
            this.showDetail(this.id);
        }
    }

    delete() {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b && this.id > 0) {
                    this.entitySrv.remove(this.id)
                        .subscribe({
                            next: () => {
                                this.snackBarSrv.showSuccessMessage();
                                this.refresh();
                                this.entitySrv.notifyChanged();
                            },
                            error: err => {
                                this.snackBarSrv.showFailureMessage();
                                throw err;
                            }
                        });
                }
            });
    }

    private refresh() {
        this.id = 0;
        this.entitySrv
            .getList(this.paginator.page - 1, this.paginator.pageSize, this.searchText.value)
            .pipe(switchMap(res => this.enrich(res.body).pipe(map(body => ({ body, itemCount: res.itemCount })))))
            .subscribe(res => {
                this.data.set(res.body);
                this.paginator.elementCount = res.itemCount;
            });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
