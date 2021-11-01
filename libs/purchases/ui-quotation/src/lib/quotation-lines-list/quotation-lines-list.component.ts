import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel} from '@ss/common/api-common';
import {ArticleService} from '@ss/stock/api-article';
import {LotsService, Store} from '@ss/common/api-lookup';
import {BaseTransactionLinesListComponent, TransactionLinesService} from "@ss/logistics/api-transaction";

@Component({
    selector: 'ss-quotation-lines-list',
    templateUrl: './quotation-lines-list.component.html',
    styleUrls: ['../../../../../common/ui-theme/src/lib/common-css.scss']
})
export class QuotationLinesListComponent extends BaseTransactionLinesListComponent implements OnInit {
    public readonly pagination = PaginationModel.newInstance();

    displayedColumns = [
        'position',
        // 'store',
        'reference',
        'description',
        'qtyOrdered',
        'qtySatisfied',
        'price',
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
        super(detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            articleSrv,
            storeNamesSrv,
            confirmationSrv);
    }

    ngOnInit() {
        super.onInit();
    }
}
