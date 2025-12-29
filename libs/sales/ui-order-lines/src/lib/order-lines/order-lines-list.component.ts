import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/master-data/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {BaseTransactionLinesListComponent, SalesOrderLinesService} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { WeightCaptureDialogButtonComponent } from '@ss/sales/weight-capture';

@Component({
    selector: 'ss-order-lines-list',
    templateUrl: './order-lines-list.component.html',
    styleUrls: [
        '../../../../../common/assets/src/assets/transac-lines-list.scss',
    ],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,

        DocInfoComponent,
        TranslatePipe,
        PaginationComponent,
        WeightCaptureDialogButtonComponent,
    ],
})
export class OrderLinesListComponent
    extends BaseTransactionLinesListComponent
    implements OnInit
{
    displayedColumns = [
        'position',
        'store',
        'reference',
        'description',
        'qtyOrdered',
        'qtySatisfied',
        'price',
        'vat',
        'total',
    ];

    constructor(
        public override detailSrv: SalesOrderLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override articleSrv: ArticleService,
        public override storeNamesSrv: LotsService,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            articleSrv,
            storeNamesSrv,
            confirmationSrv,
        );
    }
    override ngOnInit() {
        super.ngOnInit();
        this.route.data.subscribe(({ source }) => {
            if (source === 'quick') {
                this.displayedColumns = this.displayedColumns.filter(
                    (col) => col !== 'store',
                );
            }
        });
    }
}
