import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Observable} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {PaginationModel} from "@ss/common/ui-pagination";
import {LINES_DETAIL_URL} from "@ss/common/api-common";
import {Article, ArticleService} from "@ss/stock/api-article";
import {Lot, LotsService} from "@ss/common/api-lookup";
import {DeliveryLine, DeliveryLinesService} from "@ss/sales/api-delivery-lines";

@Component({
    selector: 'ss-delivery-lines-list',
    styleUrls: ['./delivery-lines-list.component.scss', '../../../../common/ui-theme/src/lib/common-css.scss'],
    templateUrl: './delivery-lines-list.component.html'
})
export class DeliveryLinesListComponent implements OnInit {

    //
    public readonly pagination = PaginationModel.newInstance();

    parentId: number;
    data: DeliveryLine[];
    selectedId: number;
    selectedRow: DeliveryLine = null;

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
        public deliveryLinesSrv: DeliveryLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public articleSrv: ArticleService,
        public storeNamesSrv: LotsService,
        public confirmationSrv: ConfirmationDialogService) {
    }

    ngOnInit() {
        this.getCurrentDeliveryId().subscribe(x => {
            if (x) {
                this.parentId = x;
                this.deliveryLinesSrv.setParentId(x);
                this.loadDeliveryLines();
                this.pagination.onChange = () => this.loadDeliveryLines();
            }
        });
    }


    getCurrentDeliveryId(): Observable<number> {
        return this.route.params.pipe(map(p => +p.id))
    }

    loadDeliveryLines() {
        this.shellSrv.setLoading(true);
        this.deliveryLinesSrv.getPage(this.pagination, null, null)
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

    select(row: DeliveryLine) {
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
                        this.deliveryLinesSrv.remove(a.id)
                            .subscribe(
                                () => {
                                    this.snackBarSrv.showSuccessMessage();
                                    this.loadDeliveryLines();
                                },
                                err => {
                                    this.snackBarSrv.showFailureMessage();
                                    this.shellSrv.setLoading(false);
                                    throw err;
                                }
                            );
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
