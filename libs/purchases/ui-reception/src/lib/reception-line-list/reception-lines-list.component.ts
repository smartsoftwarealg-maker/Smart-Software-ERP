import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {ArticleService} from '@ss/stock/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {
    BaseTransactionLinesListComponent,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { LogisticsUiStockInfoModule } from "@ss/logistics/ui-stock-info";

@Component({
    selector: 'ss-reception-lines-list',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-list.scss'],
    templateUrl: './reception-lines-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiDocInfoModule,
        LogisticsUiStockInfoModule,
        RouterOutlet
    ],
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
