import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '@ss/stock/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable, of, zip} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {LINES_DETAIL_URL, PaginationModel} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {TransactionLine} from './transaction-line';

export class BaseTransactionLinesListComponent {
    parentId: number;
    data: TransactionLine[];
    selectedId: number;
    selectedRow: TransactionLine = null;
    // stores: { [id: number]: string; } = {};
    // articles: { [reference: string]: string; } = {};

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


    onInit() {
        this.route
            .params
            .pipe(map(p => +p.id),
                tap(id => this.parentId = id),
                switchMap(id => this.loadDetailLines()))
            .subscribe(x => {
                this.shellSrv.setLoading(false);
            });
    }

    public loadDetailLines(): Observable<TransactionLine[]> {
        this.shellSrv.setLoading(true);
        this.detailSrv.setParentId(this.parentId);
        return this.detailSrv
            .getPage(this.pagination, null, null)
            .pipe(tap(data => this.data = data),
                switchMap(data => {
                    const storesIds = this.data.map(x => x.store);
                    const articleReferences = this.data.map(x => x.reference);
                    return zip(this.storeNamesSrv.getAll(storesIds), this.articleSrv.getAll(articleReferences, 'reference'))
                }),
                tap(res => {
                    this.data.forEach(d => {
                        d.storeName = res[0].find(s => s.id === d.store)?.description;
                        d.refDescription = res[1].find(a => a.reference === d.reference)?.description2;
                    });
                }),
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
}
