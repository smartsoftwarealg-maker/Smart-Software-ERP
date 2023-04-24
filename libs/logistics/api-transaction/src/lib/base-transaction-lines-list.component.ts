import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '@ss/stock/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable, of, Subscription, zip} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {LINES_DETAIL_URL, LoginService, PaginationModel} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {TransactionLine} from './transaction-line';
import {FormControl} from '@angular/forms';
import {Directive, Input, OnDestroy, OnInit} from '@angular/core';

@Directive()
export class BaseTransactionLinesListComponent implements OnInit, OnDestroy {
    private _isEditable_ = true;
    protected subscription: Subscription = null;
    searchText = new FormControl('');
    parentId: number;
    data: TransactionLine[];
    selectedId: number;
    selectedRow: TransactionLine = null;

    private _updated = false;
    readonly pagination = PaginationModel.newInstance();

    constructor(
        public detailSrv: BaseEntityExtendedService<TransactionLine>,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public articleSrv: ArticleService,
        public storeNamesSrv: LotsService,
        public confirmationSrv: ConfirmationDialogService) {
        this.pagination.onChange = () => this.loadDetailLines().subscribe(x => this.shellSrv.setLoading(false));
    }

    ngOnInit() {
        this.route
            .params
            .pipe(map(p => +p['id']),
                tap(id => this.parentId = id),
                switchMap(_ => this.loadDetailLines()))
            .subscribe(_ => this.shellSrv.setLoading(false));
        this.subscription = this.searchText
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe( str => this.loadDetailLines().subscribe());
    }

    public loadDetailLines(): Observable<TransactionLine[]> {
        // this.shellSrv.setLoading(true);
        this.detailSrv.setParentId(this.parentId);
        return this.detailSrv
            .getPage(this.pagination, this.searchText.value, null)
            .pipe(tap(data => this.data = data),
                 switchMap(res => of(this.data)));
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
                            .pipe(switchMap(_ => this.loadDetailLines()))
                            .subscribe({
                                next: _ => {
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
            })
    }

    edit() {
        if (this.selectedId) {
            this.showDetail(this.selectedId);
        }
    }

    get updated() {
        return this._updated;
    }

    showDetail(id: number) {
        const params = {
            parent: this.parentId
        };
        this.router.navigate(
            ['./' + LINES_DETAIL_URL + '/' + id],
            {relativeTo: this.route.parent, queryParams: params}
        ).then();
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
}
