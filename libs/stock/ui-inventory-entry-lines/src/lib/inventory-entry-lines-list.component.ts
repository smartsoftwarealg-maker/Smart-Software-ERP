import {Component, OnDestroy, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryEntryLinesService} from '@ss/stock/api-inventory-entry-lines';
import {Observable, Subscription} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
//import {PaginationModel} from '@ss/common/api-common';
import {LINES_DETAIL_URL, PaginationModel} from '@ss/common/api-common';
import {Article, ArticleService} from '@ss/stock/api-article';
import {LotsService, Store} from '@ss/common/api-lookup';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {BaseTransactionLinesListComponent, TransactionLine} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-inventory-entry-lines-list',
    styleUrls: ['../../../../common/ui-theme/src/lib/common-css.scss'],
    templateUrl: './inventory-entry-lines-list.component.html'
})
export class InventoryEntryLinesListComponent extends BaseTransactionLinesListComponent implements OnInit, OnDestroy {
    private subscription: Subscription = null;
    private isHandset: Observable<BreakpointState> = null;
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
        public detailSrv: InventoryEntryLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public readonly route: ActivatedRoute,
        public readonly router: Router,
        public readonly articleSrv: ArticleService,
        public readonly storeNamesSrv: LotsService,
        public confirmationSrv: ConfirmationDialogService,
        private breakPointObs: BreakpointObserver) {
        super(detailSrv, shellSrv, snackBarSrv, route, router, articleSrv, storeNamesSrv, confirmationSrv);
        this.isHandset = this.breakPointObs.observe(['(max-width: 800px)']);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngOnInit() {
        super.onInit();
        this.isHandset.subscribe(state => this.displayedColumns = state.matches ? this.SHORT : this.LONG);
    }

}
