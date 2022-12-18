import {Component, Input, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel} from '@ss/common/api-common';
import {ArticleService} from '@ss/stock/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {BaseTransactionLinesListComponent} from "@ss/logistics/api-transaction";
import {OfferLinesService} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-quotation-lines-list',
    templateUrl: './quotation-lines-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-list.scss'],
})
export class QuotationLinesListComponent extends BaseTransactionLinesListComponent implements OnInit {
    displayedColumns = [
        'position',
        // 'store',
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

    @Input()
    set id(parentId: number) {
        this.detailSrv.setParentId(parentId || 0);
        this.parentId = parentId || 0;
    }
}
