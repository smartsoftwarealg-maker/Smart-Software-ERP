import { Component, OnInit } from '@angular/core';
import {BaseTransactionLinesListComponent, TransactionLinesService} from '@ss/logistics/api-transaction';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '@ss/stock/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PurchaseRequestLinesService} from '../purchase-request-lines.service';

@Component({
    selector: 'ss-purchase-request-lines-list',
    templateUrl: './purchase-request-lines-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-list.scss'],
})
export class PurchaseRequestLinesListComponent extends  BaseTransactionLinesListComponent implements OnInit {

    displayedColumns = [
        'position',
        'reference',
        'description',
        'qtyOrdered',
        'qtySatisfied',
    ];

    constructor(
        public override detailSrv: PurchaseRequestLinesService,
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
