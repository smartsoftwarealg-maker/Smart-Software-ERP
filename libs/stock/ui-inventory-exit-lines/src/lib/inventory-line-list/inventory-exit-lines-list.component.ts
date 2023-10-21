import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryExitLinesService} from '@ss/stock/api-inventory-exit-lines';
import {ArticleService} from '@ss/stock/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {BaseTransactionLinesListComponent} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-inventory-exit-lines-list',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-list.scss'],
    templateUrl: './inventory-exit-lines-list.component.html'
})
export class InventoryExitLinesListComponent extends BaseTransactionLinesListComponent implements OnInit {

    displayedColumns = [
        'position',
        'store',
        'reference',
        'description',
        'qtySatisfied',
        'price',
        'total'
    ];


    constructor(
        public override detailSrv: InventoryExitLinesService,
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
