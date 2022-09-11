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
  styleUrls: ['../../../../common/assets/src/assets/transac-lines-list.scss'],
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
}
