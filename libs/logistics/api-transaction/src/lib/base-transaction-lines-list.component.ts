import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '@ss/master-data/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { Observable, of, Subscription } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {PaginationModel} from '@ss/common/api-common';
import {TransactionLine} from './transaction-line';
import {FormControl} from '@angular/forms';
import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import { TransactionLinesClass } from './transaction-lines.class';

@Directive()
export class BaseTransactionLinesListComponent implements OnInit, OnDestroy {
    private _isEditable_ = true;
    protected subscription: Subscription = null;
    searchText = new FormControl<string>('');
    parentId: number;
    data: TransactionLine[];
    selectedId: number;
    selectedRow: TransactionLine = null;

    private _updated = false;
    readonly pagination = PaginationModel.newInstance();

    constructor(
        public detailSrv: TransactionLinesClass,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public articleSrv: ArticleService,
        public storeNamesSrv: LotsService,
        public confirmationSrv: ConfirmationDialogService) {
        this.pagination.onChange = () => this.loadDetailLines().subscribe(() => this.shellSrv.setLoading(false));
    }

    ngOnInit() {
        this.parentId = this.detailSrv.getParentId();
        this._isEditable_ = this.detailSrv.editable;
        this.loadDetailLines().subscribe(() => this.shellSrv.setLoading(false));

        this.subscription = this.searchText
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe( () => this.loadDetailLines().subscribe());
    }

    public loadDetailLines(): Observable<TransactionLine[]> {
        return (this.detailSrv.getParentId()? this.detailSrv.getPage(this.pagination, this.searchText.value, null) : of([]))
            .pipe(tap(data => this.data = data));
    }

    select(row: TransactionLine) {
        this.selectedRow = row;
        this.selectedId = row ? row.id : 0;
    }

    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b && this.selectedId && this.selectedId > 0) {
                    const a = this.data.filter(x => x.id === this.selectedId)[0];
                    if (a && a.id) {
                        this.shellSrv.setLoading(true);
                        this.detailSrv
                            .remove(a.id)
                            .pipe(switchMap(() => this.loadDetailLines()))
                            .subscribe({
                                next: () => {
                                    this.shellSrv.setLoading(false);
                                    this.snackBarSrv.showSuccessMessage();
                                },
                                error: err => {
                                    this.snackBarSrv.showFailureMessage();
                                    this.shellSrv.setLoading(false);
                                    throw err;
                                }
                            });
                    }
                }
            });
    }

    edit() {
        if (this.selectedId) {
            this.showDetail(this.selectedId);
        }
    }

    get updated() {
        return this._updated;
    }


    unsubscribe(): void {
        this.subscription?.unsubscribe();
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    @Input()
    set isEditable(e: boolean) {
        this._isEditable_ = e;
    }

    get isEditable() {
        return this._isEditable_;
    }

    @Input()
    set parentExecutionRef(ref: number) {
        if (this.parentId > 0) {
            this.loadDetailLines().subscribe();
        }
    }
    showDetail(id: number) {
        this.router.navigate(
            ['lines-detail', id || 0],
            { relativeTo: this.route.parent}).then();
    }
}
