import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "@ss/stock/api-article";
import {LotsService, Store} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {TransactionLine} from '@ss/logistics/api-transaction';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {LINES_DETAIL_URL, PaginationModel} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';

export class BaseTransactionlineComponent {
    pagination = PaginationModel.newInstance();
    articles: { [reference: string]: string; } = {};
    data: TransactionLine[];
    stores: { [id: number]: string; } = {};
    parentId: number;
    selectedId: number;
    selectedRow: TransactionLine = null;

    constructor(
        public detailSrv: BaseEntityExtendedService<TransactionLine>,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public articleSrv: ArticleService,
        public storeNamesSrv: LotsService,
        public confirmationSrv: ConfirmationDialogService) {
    }


    loadRelatedTables(data: TransactionLine[]): Observable<any> {
        const storesIds = this.data.map(x => x.store);
        const articleReferences = this.data.map(x => x.reference);

        return this.storeNamesSrv
            .getAll(storesIds)
            .pipe(tap(st => this.onStoresLoaded(st)),
                switchMap(x => this.articleSrv.getAll(articleReferences, 'reference')),
                tap(next => next.forEach(a => this.articles[a.reference] = a.description2)));
    }

    protected onStoresLoaded(data: Store[]) {
        this.stores = data.reduce(
            (total: { [id: number]: string; }, currentValue) => {
                total[currentValue.id] = currentValue.description;
                return total
            }, {}
        );
    }
    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(answer => {
                if (answer && this.selectedId && this.selectedId > 0) {
                    const a = this.data.filter(x => x.id === this.selectedId)[0];
                    if (a && a.id) {
                        this.shellSrv.setLoading(true);
                        this.detailSrv.remove(a.id)
                            .subscribe({
                                next: next => () => {
                                    this.snackBarSrv.showSuccessMessage();
                                    this.loadTransactionLines();
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

    onInit() {
        this.route
            .params
            .pipe(map(p => +p.id))
            .subscribe(id => {
                if (id) {
                    this.parentId = id;
                    this.detailSrv.setParentId(id);
                    this.loadTransactionLines();
                    this.pagination.onChange = () => this.loadTransactionLines();
                }
            });
    }

    loadTransactionLines() {
        this.shellSrv.setLoading(true);
        this.detailSrv.getPage(this.pagination, null, null)
            .subscribe(x => {
                this.data = x;
                this.loadRelatedTables(this.data)
                    .subscribe(none => {
                        this.shellSrv.setLoading(false);
                    })
            });
    }


    select(row: TransactionLine) {
        this.selectedRow = row;
        this.selectedId = row ? row.id : 0;
    }


    edit() {
        if (this.selectedId) {
            this.showDetail(this.selectedId);
        }
    }

    public showDetail(id: number): void {
        const params = {
            parent: this.parentId
        };
        this.router.navigate(
            ['./' + LINES_DETAIL_URL + '/' + id],
            {relativeTo: this.route.parent, queryParams: params}
        ).then();
    }
}
