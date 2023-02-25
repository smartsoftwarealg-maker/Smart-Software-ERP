import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransactionLineService, TTransactionLine} from '@ss/treasury/api-transactions';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {PaginationModel} from '@ss/common/api-common';
import {FormControl} from '@angular/forms';
import {SnackBarService} from '@ss/common/ui-shell';
import {Subscription} from 'rxjs';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';

@Component({
    selector: 'ss-transaction-line-list',
    templateUrl: './transaction-line-list.component.html',
    styleUrls: ['./transaction-line-list.component.scss'],
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
