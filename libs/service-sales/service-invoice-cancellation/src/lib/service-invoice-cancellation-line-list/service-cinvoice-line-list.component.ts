import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    BaseTransactionLinesListComponent, TransactionLinesService
} from "@ss/logistics/api-transaction";
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '@ss/stock/api-article';
import { LotsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';
import { InvoiceLinesService } from '@ss/sales/api-invoice';

@Component({
    selector: 'ss-service-cinvoice-line-list',
    standalone: true,
    imports: [
        CommonModule,
        CommonUiImageInputModule,
        CommonUiLangModule,
        LogisticsUiDocInfoModule,
        MatTableModule,
        UiPaginationModule,
        MatSortModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialModule
    ],
    templateUrl: './service-cinvoice-line-list.component.html',
    styleUrls: ['./service-cinvoice-line-list.component.scss']
})
export class ServiceCinvoiceLineListComponent extends BaseTransactionLinesListComponent implements OnInit {
    displayedColumns = [
        'position',
        'reference',
        'description',
        'qtyOrdered',
        'qtySatisfied',
        'price',
        'vat'
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
        super(detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            articleSrv,
            storeNamesSrv,
            confirmationSrv);
    }
}
