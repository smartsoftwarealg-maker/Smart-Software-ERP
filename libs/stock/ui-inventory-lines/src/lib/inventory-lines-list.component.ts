import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryLinesService} from '@ss/stock/api-inventory-lines';
import {ArticleService} from '@ss/stock/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {BaseTransactionLinesListComponent} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-inventory-lines-list',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-list.scss'],
    templateUrl: './inventory-lines-list.component.html'
})
export class InventoryLinesListComponent extends BaseTransactionLinesListComponent implements OnInit {
    displayedColumns = [
        'position',
        'store',
        'reference',
        'description',
        'qtySatisfied',
        'price',
    ];


    constructor(
        public override detailSrv: InventoryLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override articleSrv: ArticleService,
        public override storeNamesSrv: LotsService,
        public override confirmationSrv: ConfirmationDialogService) {
        super(detailSrv, shellSrv, snackBarSrv, route, router, articleSrv, storeNamesSrv, confirmationSrv);
    }

    override showDetail(id: number) {
        this.router.navigate(
            ['lines-detail', id || 0],
            { relativeTo: this.route.parent}).then();
    }
}
