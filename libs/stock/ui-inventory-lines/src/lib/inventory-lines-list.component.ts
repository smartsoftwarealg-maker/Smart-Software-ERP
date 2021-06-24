import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryLinesService} from '@ss/stock/api-inventory-lines';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {PaginationModel} from '@ss/common/api-common';
import {LINES_DETAIL_URL} from '@ss/common/api-common';
import {Article, ArticleService} from '@ss/stock/api-article';
import {Lot, LotsService} from '@ss/common/api-lookup';
import {TransactionLine} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-inventory-lines-list',
    styleUrls: ['./inventory-lines-list.component.scss'],
    templateUrl: './inventory-lines-list.component.html'
})
export class InventoryLinesListComponent implements OnInit {

    //
    public readonly pagination = PaginationModel.newInstance();

    parentId: number;
    data: TransactionLine[] = [];
    selectedId: number;
    selectedRow: TransactionLine;

    articles: { [reference: string]: string; } = {};
    stores: { [id: number]: string; } = {};

    displayedColumns = [
        'position',
        'store',
        'reference',
        'description',
        'qtySatisfied',
        'price',
    ];


    constructor(
        public inventoryLinesSrv: InventoryLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public articleSrv: ArticleService,
        public storeNamesSrv: LotsService,
        public confirmationSrv: ConfirmationDialogService) {
    }


    ngOnInit() {
        this.getCurrentinventoryId().subscribe(x => {
            if (x) {
                this.parentId = x;
                this.inventoryLinesSrv.setParentId(x);
                this.loadInventoryLines();
                this.pagination.onChange = () => this.loadInventoryLines();
            }
        });
    }


    getCurrentinventoryId(): Observable<number> {
        return this.route.params.pipe(map(p => +p.id))
    }

    loadInventoryLines() {
        this.shellSrv.setLoading(true);
        this.inventoryLinesSrv.getPage(this.pagination, null, null)
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

    select(inventoryLine: TransactionLine): void {
        this.selectedId = inventoryLine.id;
        this.selectedRow = inventoryLine;
    }

    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selectedId && this.selectedId > 0) {
                        const a = this.data.filter(x => x.id === this.selectedId)[0];
                        if (a && a.id) {
                            this.shellSrv.setLoading(true);
                            this.inventoryLinesSrv.remove(a.id)
                                .subscribe(
                                    () => {
                                        this.snackBarSrv.showSuccessMessage();
                                        this.loadInventoryLines();
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
            parent: this.parentId,
            id: id
        };
        this.router.navigate(['./' + LINES_DETAIL_URL + '/' + id], {relativeTo: this.route.parent, queryParams: params})
            .then();
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
