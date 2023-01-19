import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {BaseTransactionLinesListComponent} from '@ss/logistics/api-transaction';
import {OfferLinesService} from '../../../../logistics/api-transaction/src/lib/offer-lines.service';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ss-order-lines-list',
  templateUrl: './purchase-order-lines-list.component.html',
  styleUrls: ['../../../../common/assets/src/assets/transac-lines-list.scss'],
})
export class PurchaseOrderLinesListComponent extends  BaseTransactionLinesListComponent implements OnInit {
    displayedColumns = [
        'position',
        'reference',
        'description',
        'qtyOrdered',
        'qtySatisfied',
        'price',
        'vat',
    ];

    constructor(
        public override detailSrv: OfferLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override articleSrv: ArticleService,
        public override storeNamesSrv: LotsService,
        public override confirmationSrv: ConfirmationDialogService) {
        super(detailSrv, shellSrv, snackBarSrv, route, router, articleSrv, storeNamesSrv, confirmationSrv);
    }
}
