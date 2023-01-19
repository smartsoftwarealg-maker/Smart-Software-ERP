import { Component, OnInit } from '@angular/core';
import {BaseTransactionLinesListComponent, TransactionLinesService} from '@ss/logistics/api-transaction';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '@ss/stock/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';

@Component({
    selector: 'ss-reception-cancellation-lines-list',
    templateUrl: './reception-cancellation-lines-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-list.scss'],
})
export class ReceptionCancellationLinesListComponent extends BaseTransactionLinesListComponent implements OnInit {

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
}
