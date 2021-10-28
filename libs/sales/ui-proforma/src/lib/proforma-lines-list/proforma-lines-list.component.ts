import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {LINES_DETAIL_URL, PaginationModel} from '@ss/common/api-common';
import {Article, ArticleService} from '@ss/stock/api-article';
import {LotsService, Store} from '@ss/common/api-lookup';
import {TransactionLine} from '@ss/logistics/api-transaction';
import {ProformaLinesService} from "../proforma-lines.service";

@Component({
    selector: 'ss-proforma-list',
    templateUrl: './proforma-lines-list.component.html',
    styleUrls: ['../../../../../common/ui-theme/src/lib/common-css.scss']
})
export class ProformaLinesListComponent implements OnInit {
    public readonly pagination = PaginationModel.newInstance();

    parentId: number;
    data: TransactionLine[];
    selectedId: number;
    selectedRow: TransactionLine = null;

    articles: { [reference: string]: string; } = {};
    stores: { [id: number]: string; } = {};

    displayedColumns = [
        'position',
        'store',
        'reference',
        'description',
        'qtyOrdered',
        'qtySatisfied',
        'price',
    ];


    constructor(
        public proformaSrv: ProformaLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public articleSrv: ArticleService,
        public storeNamesSrv: LotsService,
        public confirmationSrv: ConfirmationDialogService) {
    }

    ngOnInit() {
        this.route
            .params
            .pipe(map(p => +p.id))
            .subscribe(id => {
                if (id) {
                    this.parentId = id;
                    this.proformaSrv.setParentId(id);
                    this.loadProformaLines();
                    this.pagination.onChange = () => this.loadProformaLines();
                }
            });
    }

    loadProformaLines() {
        this.shellSrv.setLoading(true);
        this.proformaSrv.getPage(this.pagination, null, null)
            .subscribe(x => {
                this.data = x;
                this.loadRelatedTables(this.data)
                    .subscribe(none => {
                        this.shellSrv.setLoading(false);
                    })
            });
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

    select(row: TransactionLine) {
        this.selectedRow = row;
        this.selectedId = row ? row.id : 0;
    }

    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(answer => {
                if (answer && this.selectedId && this.selectedId > 0) {
                    const a = this.data.filter(x => x.id === this.selectedId)[0];
                    if (a && a.id) {
                        this.shellSrv.setLoading(true);
                        this.proformaSrv.remove(a.id)
                            .subscribe({
                                next: next => () => {
                                    this.snackBarSrv.showSuccessMessage();
                                    this.loadProformaLines();
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

    public showDetail(id: number): void {
        const params = {
            parent: this.parentId
        };
        this.router.navigate(
            ['./' + LINES_DETAIL_URL + '/' + id],
            {relativeTo: this.route.parent, queryParams: params}
        ).then();
    }


    private onStoresLoaded(data: Store[]) {
        this.stores = data.reduce(
            (total: { [id: number]: string; }, currentValue) => {
                total[currentValue.id] = currentValue.description;
                return total
            }, {}
        );
    }
}
