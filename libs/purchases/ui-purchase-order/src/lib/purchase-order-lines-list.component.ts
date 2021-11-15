import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {PaginationModel} from '@ss/common/api-common';
import {LINES_DETAIL_URL} from '@ss/common/api-common';
import {Article, ArticleService} from '@ss/stock/api-article';
import {Store, LotsService} from '@ss/common/api-lookup';
import {
    BaseTransactionLinesListComponent,
    TransactionLine,
    TransactionLinesService
} from '@ss/logistics/api-transaction';

@Component({
  selector: 'ss-order-lines-list',
  templateUrl: './purchase-order-lines-list.component.html',
  styleUrls: ['../../../../common/ui-theme/src/lib/common-css.scss']
})
export class PurchaseOrderLinesListComponent extends  BaseTransactionLinesListComponent implements OnInit {

    displayedColumns = [
        'position',
        'store',
        'reference',
        'description',
        'qtyOrdered',
        'qtySatisfied',
        'price',
        'vat',
    ];

    constructor(
        public detailSrv: TransactionLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public articleSrv: ArticleService,
        public storeNamesSrv: LotsService,
        public confirmationSrv: ConfirmationDialogService) {
        super(detailSrv, shellSrv, snackBarSrv, route, router, articleSrv, storeNamesSrv, confirmationSrv);
    }
    ngOnInit() {
        super.onInit();
    }

    //
    // ngOnInit() {
    //     this.getCurrentOrderId().subscribe(id => {
    //         if (id) {
    //             this.parentId = id;
    //             this.detailSrv.setParentId(id);
    //             this.loadOrderLines();
    //             this.pagination.onChange = () => this.loadOrderLines();
    //         }
    //     });
    // }
    //
    //
    // getCurrentOrderId(): Observable<number> {
    //     return this.route.params.pipe(map(p => +p.id))
    // }
    //
    // loadOrderLines() {
    //     this.shellSrv.setLoading(true);
    //     this.detailSrv.getPage(this.pagination, null, null)
    //         .subscribe(x => {
    //             this.data = x;
    //             this.loadRelatedTables(this.data)
    //                 .subscribe(none => {
    //                     this.shellSrv.setLoading(false);
    //                 })
    //         });
    // }
    //
    // loadRelatedTables(data): Observable<any> {
    //     const storesIds = this.data.map(x => x.store);
    //     const articleReferences = this.data.map(x => x.reference);
    //
    //     return this.storeNamesSrv.getAll(storesIds)
    //         .pipe(tap(st => this.onStoresLoaded(st)))
    //         .pipe(switchMap(x => this.articleSrv.getAll(articleReferences, 'reference')))
    //         .pipe(tap(art => this.onArticlesLoaded(art)))
    // }
    //
    // select(row: TransactionLine) {
    //     this.selectedRow = row;
    //     this.selectedId = row ? row.id : 0;
    // }
    //
    // public deleteSelected(): void {
    //     this.confirmationSrv.confirmDelete()
    //         .subscribe(answer => {
    //             if (answer && this.selectedId && this.selectedId > 0) {
    //                 const a = this.data.filter(x => x.id === this.selectedId)[0];
    //                 if (a && a.id) {
    //                     this.shellSrv.setLoading(true);
    //                     this.detailSrv.remove(a.id)
    //                         .subscribe(
    //                             () => {
    //                                 this.snackBarSrv.showSuccessMessage();
    //                                 this.loadOrderLines();
    //                             },
    //                             err => {
    //                                 this.snackBarSrv.showFailureMessage();
    //                                 this.shellSrv.setLoading(false);
    //                                 throw err;
    //                             }
    //                         );
    //                 }
    //             }
    //         })
    // }
    //
    // edit() {
    //     if (this.selectedId) {
    //         this.showDetail(this.selectedId);
    //     }
    // }
    //
    // public showDetail(id: number): void {
    //     const params = {
    //         parent: this.parentId
    //     };
    //     this.router.navigate(
    //         ['./' + LINES_DETAIL_URL + '/' + id],
    //         {relativeTo: this.route.parent, queryParams: params}
    //     ).then();
    // }
    //
    //
    // private onArticlesLoaded(data: Article[]) {
    //     this.articles = data.reduce( //TODO: Refactor
    //         (total, currentValue) => {
    //             total[currentValue.reference] = currentValue.description2;
    //             return total
    //         }, {}
    //     );
    // }
    //
    // private onStoresLoaded(data: Store[]) {
    //     this.stores = data.reduce(
    //         (total: { [id: number]: string; }, currentValue) => {
    //             total[currentValue.id] = currentValue.description;
    //             return total
    //         }, {}
    //     );
    // }
}
