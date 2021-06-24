import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryEntryLinesService} from '@ss/stock/api-inventory-entry-lines';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
//import {PaginationModel} from '@ss/common/api-common';
import {LINES_DETAIL_URL, PaginationModel} from '@ss/common/api-common';
import {Article, ArticleService} from '@ss/stock/api-article';
import {LotsService, Lot} from '@ss/common/api-lookup';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {TransactionLine} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-inventory-entry-lines-list',
    styleUrls: ['../../../../common/ui-theme/src/lib/common-css.scss'],
    templateUrl: './inventory-entry-lines-list.component.html'
})
export class InventoryEntryLinesListComponent implements OnInit {
    private isHandset: Observable<BreakpointState> = null;

    //
    public readonly pagination = PaginationModel.newInstance();

    parentId: number;
    data: TransactionLine[] = [];
    selectedRow: TransactionLine;
    selectedId: number;

    articles: { [reference: string]: string; } = {};
    stores: { [id: number]: string; } = {};

    private readonly LONG = [
        'position',
        'store',
        'reference',
        'description',
        'qtySatisfied',
        'price',
    ];
    private readonly SHORT = [
        'position',
        'description',
        'qtySatisfied',
        'price',
    ];
    displayedColumns = this.LONG;


    constructor(
        public inventoryEntryLinesSrv: InventoryEntryLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public readonly route: ActivatedRoute,
        public readonly router: Router,
        public readonly articleSrv: ArticleService,
        public readonly storeNamesSrv: LotsService,
        public confirmationSrv: ConfirmationDialogService,
        private breakPointObs: BreakpointObserver) {
        this.isHandset = this.breakPointObs.observe(['(max-width: 800px)']);
    }


    ngOnInit() {
        this.getCurrentInventoryEntryId().subscribe(x => {
            if (x) {
                this.parentId = x;
                this.inventoryEntryLinesSrv.setParentId(x);
                this.loadInventoryEntryLines();
                this.pagination.onChange = () => this.loadInventoryEntryLines();
            }
        });

        this.isHandset.subscribe(state => this.displayedColumns = state.matches ? this.SHORT : this.LONG);
    }


    getCurrentInventoryEntryId(): Observable<number> {
        return this.route.params.pipe(map(p => +p.id))
    }

    loadInventoryEntryLines() {
        this.shellSrv.setLoading(true);
        this.inventoryEntryLinesSrv.getPage(this.pagination, null, null)
            .subscribe(x => {
                this.data = x;
                this.loadRelatedTables(this.data)
                    .subscribe(none => {
                        this.shellSrv.setLoading(false);
                    })
            });
    }

    loadRelatedTables(data): Observable<any> {

        const storesIds = this.data.map(x => x.store);
        const articleReferences = this.data.map(x => x.reference);

        return this.storeNamesSrv.getAll(storesIds)
            .pipe(tap(st => this.onStoresLoaded(st)))
            .pipe(switchMap(x => this.articleSrv.getAll(articleReferences, 'reference')))
            .pipe(tap(art => this.onArticlesLoaded(art)))
    }

    selectRow(row: TransactionLine): void {
        this.selectedRow = row;
        this.selectedId = row.id;
    }

    select(id: number): void {
        this.selectedId = id;
    }

    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selectedId && this.selectedId > 0) {
                        const a = this.data.filter(x => x.id === this.selectedId)[0];
                        if (a && a.id) {
                            this.shellSrv.setLoading(true);
                            this.inventoryEntryLinesSrv.remove(a.id)
                                .subscribe(
                                    () => {
                                        this.snackBarSrv.showSuccessMessage();
                                        this.loadInventoryEntryLines();
                                    },
                                    err => {
                                        this.snackBarSrv.showFailureMessage();
                                        this.shellSrv.setLoading(false);
                                        throw err;
                                    }
                                );
                        }
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


    private onArticlesLoaded(data: Article[]) {
        this.articles = data.reduce(
            (total, currentValue) => {
                total[currentValue.reference] = currentValue.description2;
                return total
            }, {}
        );
    }

    private onStoresLoaded(data: Lot[]) {
        this.stores = data.reduce(
            (total, currentValue) => {
                total[currentValue.id] = currentValue.description;
                return total
            }, {}
        );
    }

}
