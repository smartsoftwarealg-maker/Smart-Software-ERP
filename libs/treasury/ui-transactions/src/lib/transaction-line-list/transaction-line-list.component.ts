import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransactionLineService, TTransactionLine} from '@ss/treasury/api-transactions';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {PaginationModel} from '@ss/common/api-common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SnackBarService} from '@ss/common/ui-shell';
import {Subscription} from 'rxjs';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { NgIf, DecimalPipe, DatePipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { MatInput } from '@angular/material/input';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';
import { TranslatePipe } from '../../../../../common/ui-lang/src/lib/translate.pipe';

@Component({
    selector: 'ss-transaction-line-list',
    templateUrl: './transaction-line-list.component.html',
    styleUrls: ['./transaction-line-list.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        FormsModule,
        ReactiveFormsModule,
        MatMiniFabButton,
        MatTooltip,
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
        TranslatePipe,
    ],
})
export class TransactionLineListComponent implements OnInit, OnDestroy {
    private subscription: Subscription = null;
    searchText = new FormControl<string>('');
    parentId = 0;
    id = 0;
    data: TTransactionLine[] = [];
    paginator = PaginationModel.newInstance();
    displayedColumns = [
        'invoiceNo',
        'description',
        'income',
        'expenses',
        // 'vat',
        'invoiceDate'
    ];

    constructor(private entitySrv: TransactionLineService,
                private snackBarSrv: SnackBarService,
                private confirmationSrv: ConfirmationDialogService,
                private route: Router,
                private router: ActivatedRoute) {}

    ngOnInit(): void {
        this.router
            .parent
            .parent
            .params
            .pipe(switchMap(res => {
                this.parentId = +res['id'] || 0;
                this.entitySrv.setParentId(this.parentId);
                return this.entitySrv.getList(this.paginator.page - 1, this.paginator.pageSize, this.searchText.value);
            }))
            .subscribe(res => {
                this.data = res.body;
                this.paginator.elementCount = res.itemCount;
            });

        this.subscription = this.searchText
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).pipe(switchMap(_ => this.entitySrv.getList(this.paginator.page - 1, this.paginator.pageSize, this.searchText.value)))
            .subscribe(res => {
                this.data = res.body;
                this.paginator.elementCount = res.itemCount;
            });
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
                if (b) {
                    if (this.id > 0) {
                            this.entitySrv.remove(this.id)
                                .subscribe({
                                    next: () => {
                                        this.snackBarSrv.showSuccessMessage();
                                        this.refresh();
                                    },
                                    error: err => {
                                        this.snackBarSrv.showFailureMessage();
                                        throw err;
                                    }
                                });
                        }
                }
            })
    }

    private refresh() {
        this.id = 0;
        this.entitySrv
            .getList(this.paginator.page - 1, this.paginator.pageSize, this.searchText.value)
            .subscribe(res => {
                this.data = res.body;
                this.paginator.elementCount = res.itemCount;
            });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
