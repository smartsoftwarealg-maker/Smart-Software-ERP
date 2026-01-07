import { Component, inject, OnInit } from '@angular/core';
import {ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ArticleService } from '@ss/master-data/api-article';
import { LotsService } from '@ss/common/api-lookup';
import {
    BaseTransactionLinesListComponent,
    TransactionLine,
} from '@ss/logistics/api-transaction';
import { DecimalPipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import {
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { TranslatePipe } from '@ss/common/ui-lang';
import { ProductionLinesService } from '../production-services/production-lines.service';
import { AccTransactionLineService } from '@ss/accounting/accounting-api';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-production-transfer-lines-list',
    templateUrl: './production-transfer-lines-list.component.html',
    styleUrl: './production-transfer-lines-list.component.scss',
    standalone: true,
    imports: [
        MaterialModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        PaginationComponent,
        DocInfoComponent,
        DecimalPipe,
        TranslatePipe,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
    ],
})
export class ProductionTransferLinesListComponent
    extends BaseTransactionLinesListComponent
    implements OnInit
{

    override displayedColumns = [
        'position',
        'reference',
        'description',
        'qtyOrdered',
        'qtySatisfied',
        'storeDescription',
        'storeName',
        // 'price',
        // 'total',
    ];

    constructor(
        public override detailSrv: ProductionLinesService,
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
    }

    override select(row: TransactionLine) {
        super.select(row);
    }

    entitySrv = inject(AccTransactionLineService);

    private refresh() {
        this.detailSrv.getPage(this.pagination).subscribe({
            next: (data) => {
                this.data = data;
            },
            error: () => {
                this.snackBarSrv.showFailureMessage('refresh failed');
            },
        });
    }

    transfer() {
        this.detailSrv.transfer(this.selectedId).subscribe({
            next: () => {
                this.snackBarSrv.showSuccessMessage();
            },
            error: (err) => {
                this.snackBarSrv.showFailureMessage();
                throw err;
            },
        });
    }

    cancelTransfer() {
        this.confirmationSrv
            .confirm('PROD_CANCEL_TRANSFER_CONFIRMATION', 'PROD_CANCEL_TRANSFER_CONFIRMATION')
            .subscribe((res) => {
                if (res) {
                    this.detailSrv.cancelTransfer(this.selectedId).subscribe({
                        next: () => {
                            this.snackBarSrv.showSuccessMessage();
                        },
                        error: (err) => {
                            this.snackBarSrv.showFailureMessage();
                            throw err;
                        },
                    });
                }
            });
    }
}
