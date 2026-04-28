import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '@ss/master-data/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { Observable, of, Subscription } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import { LoginService, PaginationModel } from '@ss/common/api-common';
import {TransactionLine} from './transaction-line';
import {FormControl} from '@angular/forms';
import { Directive, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { TransactionLinesClass } from './transaction-lines.class';
import { OptionService } from '@ss/logistics/ui-options';
import {PackagingUnitsService} from '@ss/logistics/packaging-units';
import {PackagingUnit} from '@ss/logistics/packaging-units';

@Directive()
export class BaseTransactionLinesListComponent implements OnInit, OnDestroy {
    #packagingUnitSrv = inject(PackagingUnitsService);
    #_isEditable_ = true;
    #_unitsMap = new Map<number, string>();

    protected optionSrv = inject(OptionService);
    protected loginSrv = inject(LoginService);
    protected subscription: Subscription = null;
    readonly pagination = null;
    searchText = new FormControl<string>('');
    parentId: number;
    data: TransactionLine[];
    // selectedId: number;
    selectedRow: TransactionLine = null;
    usesLots = signal(false);
    usesUnits = signal(false);
    loading = signal(true);

    displayedColumns: string[] = [];

    constructor(
        public detailSrv: TransactionLinesClass,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public articleSrv: ArticleService,
        public storeNamesSrv: LotsService,
        public confirmationSrv: ConfirmationDialogService,
    ) {
        this.pagination = PaginationModel.newInstance({
            page: this.detailSrv.currentPage || 1,
            pageSize: 5,
            elementCount: 0,
        });

        this.pagination.onChange = () => {
            this.detailSrv.currentPage = this.pagination.page;
            this.loading.set(true);
            this.loadDetailLines()
                .subscribe(() => {
                    this.shellSrv.setLoading(false);
                    this.loading.set(false);
                    }
                );
        };
    }

    ngOnInit() {
        this.parentId = this.detailSrv.getParentId();
        this.#_isEditable_ = this.detailSrv.editable;
        // this.loadDetailLines().subscribe(() => this.shellSrv.setLoading(false));

        this.optionSrv
            .get(this.loginSrv.appCtx.center)
            .pipe(
                tap((res) => {
                    this.usesLots.set(res.usesLots);
                    this.usesUnits.set(res.usesUnits);
                    this.displayedColumns = this.displayedColumns.filter(
                        (e) =>
                            (res.usesLots ||
                                (e !== 'lotNumber' &&
                                    e !== 'expirationDate' &&
                                    e !== 'storeDescription')) &&
                            (res.usesUnits || e !== 'units') &&
                            (!res.serviceInvoiceOnly || e !== 'store'),
                    );
                }),
                switchMap((res) =>
                    res.usesUnits
                        ? this.#packagingUnitSrv.getData2(0, 50)
                        : of([] as PackagingUnit[]),
                ),
                tap((res) => {
                    this.#_unitsMap.clear();
                    res.forEach((e) =>
                        this.#_unitsMap.set(e.units, e.description),
                    );
                }),
                switchMap(() => this.loadDetailLines()),
            )
            .subscribe(() => {
                this.shellSrv.setLoading(false);
                this.loading.set(false);
            });

        this.subscription = this.searchText.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(() => this.loadDetailLines().subscribe());
    }

    public loadDetailLines(): Observable<TransactionLine[]> {
        return (
            this.detailSrv.getParentId()
                ? this.detailSrv.getPage(
                    this.pagination,
                    this.searchText.value,
                    null,
                )
                : of([])
        ).pipe(
            tap((data) => {
                this.data = data;
                this.data.forEach(
                    (d) =>
                        (d.unitsDescription =
                            this.#_unitsMap.get(d.units) || d.units + ''),
                );
            }),
        );
    }

    select(row: TransactionLine) {
        this.selectedRow = row;
        this.detailSrv.selectedId.set(row ? row.id : 0);
    }

    public deleteSelected(): void {
        this.confirmationSrv
            .confirmDelete()
            .subscribe((b) => {
                if (b && this.detailSrv.selectedId() > 0) {
                    const a = this.data.filter(
                        (x) => x.id === this.detailSrv.selectedId())[0];
                    if (a && a.id) {
                        this.shellSrv.setLoading(true);
                        this.detailSrv
                            .remove(a.id)
                            .pipe(switchMap(() => this.loadDetailLines()))
                            .subscribe({
                                next: () => {
                                    this.shellSrv.setLoading(false);
                                    this.loading.set(false);
                                    this.snackBarSrv.showSuccessMessage();
                                },
                                error: (err) => {
                                    this.snackBarSrv.showFailureMessage();
                                    this.shellSrv.setLoading(false);
                                    this.loading.set(false);
                                    throw err;
                                },
                            });
                    }
                }
        });
    }

    edit() {
        if (this.detailSrv.selectedId()) {
            this.showDetail(this.detailSrv.selectedId());
        }
    }

    // get updated() {
    //     return this._updated;
    // }

    unsubscribe(): void {
        this.subscription?.unsubscribe();
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    // @Input()
    // set isEditable(e: boolean) {
    //     this.#_isEditable_ = e;
    // }

    get isEditable() {
        return this.#_isEditable_;
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    set parentExecutionRef(ref: number) {
        if (this.parentId > 0) {
            this.loadDetailLines().subscribe();
        }
    }
    showDetail(id: number) {
        this.router
            .navigate(['lines-detail', id || 0], {
                relativeTo: this.route.parent,
            })
            .then();
    }

    get selectedId() {
        return this.detailSrv.selectedId();
    }

}
