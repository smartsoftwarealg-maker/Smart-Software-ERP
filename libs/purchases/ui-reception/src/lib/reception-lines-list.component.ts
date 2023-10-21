import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {
    BaseTransactionLinesListComponent,
    TransactionLinesService
} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-reception-lines-list',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-list.scss'],
    templateUrl: './reception-lines-list.component.html'
})
export class ReceptionLinesListComponent  extends BaseTransactionLinesListComponent implements OnInit {
    displayedColumns = [
        'position',
        'store',
        'reference',
        'description',
        'qtySatisfied',
        'price',
        'vat',
        'total'
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
