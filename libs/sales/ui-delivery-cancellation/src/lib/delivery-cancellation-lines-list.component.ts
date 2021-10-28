import { Component, OnInit } from '@angular/core';
import {PaginationModel} from '@ss/common/api-common';
import {DeliveryLinesService} from '@ss/sales/api-delivery-lines';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {Article, ArticleService} from '@ss/stock/api-article';
import {Store, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {LINES_DETAIL_URL} from '@ss/common/api-common';
import {TransactionLine} from '@ss/logistics/api-transaction';

@Component({
  selector: 'ss-delivery-cancellation-lines-list',
  templateUrl: './delivery-cancellation-lines-list.component.html',
  styleUrls: ['./delivery-cancellation-lines-list.component.scss']
})
export class DeliveryCancellationLinesListComponent implements OnInit {
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
        this.getCurrentCancellationId().subscribe(x => {
            if (x) {
                this.parentId = x;
                this.deliveryLinesSrv.setParentId(x);
                this.loadCancellationLines();
                this.pagination.onChange = () => this.loadCancellationLines();
            }
        });
    }


    getCurrentCancellationId(): Observable<number> {
        return this.route.params.pipe(map(p => +p.id))
    }

    loadCancellationLines() {
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
                        this.deliveryLinesSrv.remove(a.id)
                            .subscribe(
                                () => {
                                    this.snackBarSrv.showSuccessMessage();
                                    this.loadCancellationLines();
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
        this.articles = data.reduce( //TODO: Refactor
            (total, currentValue) => {
                total[currentValue.reference] = currentValue.description2;
                return total
            }, {}
        );
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
