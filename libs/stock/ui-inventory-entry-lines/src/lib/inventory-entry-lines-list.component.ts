import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {InventoryEntryLine, InventoryEntryLinesService} from "@ss/stock/api-inventory-entry-lines";
import {Observable} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {PaginationModel} from "@ss/common/ui-pagination";
import {LINES_DETAIL_URL} from "@ss/common/api-common";
import {Article, ArticleService} from "@ss/stock/api-article";
import {StoreName, StoreNameService} from "@ss/common/api-lookup";

@Component({
    selector: 'ss-inventory-entry-lines-list',
    styleUrls: ['./inventory-entry-lines-list.component.scss'],
    templateUrl: './inventory-entry-lines-list.component.html'
})
export class InventoryEntryLinesListComponent implements OnInit {

    //
    public readonly pagination = PaginationModel.newInstance();

    parentId: number;
    data: InventoryEntryLine[];
    selectedRow: InventoryEntryLine;
    selected: number;

    articles: { [reference: string]: string; } = {};
    stores: { [id: number]: string; } = {};

    displayedColumns = [
        'position',
        'store',
        'reference',
        'description',
        'qtySatisfied',
        'price',
        'controls'
    ];


    constructor(
        public inventoryEntryLinesSrv: InventoryEntryLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public articleSrv: ArticleService,
        public storeNamesSrv: StoreNameService,
        public confirmationSrv: ConfirmationDialogService) {
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

    selectRow(row: InventoryEntryLine): void {
        this.selectedRow = row;
        this.selected = row.id;
    }

    select(id: number): void {
        this.selected = id;
    }

    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selected && this.selected > 0) {
                        const a = this.data.filter(x => x.id === this.selected)[0];
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
        if (this.selected) {
            this.showDetail(this.selected);
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

    private onStoresLoaded(data: StoreName[]) {
        this.stores = data.reduce(
            (total, currentValue) => {
                total[currentValue.id] = currentValue.description;
                return total
            }, {}
        );
    }

}
