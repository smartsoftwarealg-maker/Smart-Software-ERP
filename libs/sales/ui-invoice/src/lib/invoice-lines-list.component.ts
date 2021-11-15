import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {InvoiceLinesService} from '@ss/sales/api-invoice';
import {BaseTransactionLinesListComponent} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-invoice-lines-list',
    templateUrl: './invoice-lines-list.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-list.scss'],
})
export class InvoiceLinesListComponent extends BaseTransactionLinesListComponent implements OnInit {

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
        public detailSrv: InvoiceLinesService,
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
