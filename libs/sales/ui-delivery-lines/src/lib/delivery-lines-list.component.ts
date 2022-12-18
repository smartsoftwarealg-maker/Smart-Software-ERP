import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
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
    selector: 'ss-delivery-lines-list',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-list.scss'],
    templateUrl: './delivery-lines-list.component.html'
})
export class DeliveryLinesListComponent extends BaseTransactionLinesListComponent implements OnInit {

    displayedColumns = [
        'position',
        'store',
        'reference',
        'description',
        'qtySatisfied',
        'price',
        'vat',
    ];

    constructor(
        public override detailSrv: TransactionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override articleSrv: ArticleService,
        public override storeNamesSrv: LotsService,
        public override confirmationSrv: ConfirmationDialogService) {
        super(detailSrv, shellSrv, snackBarSrv, route, router, articleSrv, storeNamesSrv, confirmationSrv);
    }

    ngOnInit() {
        super.onInit();
    }
}
