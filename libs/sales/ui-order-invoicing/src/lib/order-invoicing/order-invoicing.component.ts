import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    MaterialModule,
    PaginationModel,
    PaginatorPersistenceService,
} from '@ss/common/api-common';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatCheckbox } from '@angular/material/checkbox';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DatePipe, DecimalPipe } from '@angular/common';
import {
    InvoiceInfo,
    QuickOrder,
    QuickOrderService,
} from '@ss/sales/ui-quick-order';
import {
    SalesOrderLinesService,
    TransactionLine,
} from '@ss/logistics/api-transaction';
import { WeightCaptureService } from '@ss/sales/weight-capture';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'ss-ui-order-invoicing',
    templateUrl: './order-invoicing.component.html',
    styleUrls: [
        './order-invoicing.component.scss',
        '../../../../../common/assets/src/assets/transac-lines-list.scss',
    ],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DatePipe,
        MatCheckbox,
        MatSort,
        MatSortHeader,
        MaterialModule,
        DecimalPipe,
    ],
})
export class OrderInvoicingComponent extends BaseEntityListComponent<QuickOrder> {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'docStatus',
        'mode',
        'invoiceNumber',
        'option',
    ];
    transactionDisplayedColumns = [
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
    transactions: TransactionLine[];
    salesOrderLinesSrv = inject(SalesOrderLinesService);
    constructor(
        public quickOrderSrv: QuickOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            quickOrderSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'SALES_ORDER_INVOICING',
        );
    }

    override ngOnInit() {
        this.addButton.visible = false;
        this.deleteButton.visible = false;
        this.editButton.visible = false;
        super.ngOnInit();
    }

    private weightCaptureSrv = inject(WeightCaptureService);
    public readonly transacPagination = PaginationModel.newInstance();

    getInvoiceType(n: number) {
        if (n === 1) {
            return 'COMMON_INVOICE';
        }
        if (n === 2) {
            return 'COMMON_DELIVERY';
        }
        return '';
    }

    invoiceInfo: InvoiceInfo[] = [];

    getInvoiceNumber(id: number) {
        return this.invoiceInfo.find((inv) => inv.id === id)?.invoiceNumber;
    }

    override select(id: number) {
        this.selected = id;
        if (id > 0) {
            this.salesOrderLinesSrv.setParentId(id);
            this.salesOrderLinesSrv
                .getPage(this.transacPagination)
                .pipe(
                    tap((data) => {
                        data.forEach((line) => {
                            this.weightCaptureSrv
                                .getWeightCapture(line.id)
                                .subscribe((captures) => {
                                    line.tareWeight = captures.tare;
                                    line.brutWeight = captures.brut;
                                });
                        });
                    }),
                )
                .subscribe((res) => {
                    this.transactions = res;
                });
        }
    }

    generateInvoice(id: number) {
        this.quickOrderSrv.generateInvoice(id).subscribe({
            next: () => {
                this.snackBarSrv.showSuccessMessage();
                this.refresh();
            },
            error: (err) => {
                this.snackBarSrv.showFailureMessage();
                throw err;
            },
        });
    }

    getInvoices(): void {
        const ids = this.data.map((d) => d.id).join(',');
        this.quickOrderSrv
            .getInvoiceInfo(ids)
            .pipe(tap((res) => (this.invoiceInfo = res)))
            .subscribe();
    }

    override refresh() {
        super.refresh(this.getInvoices.bind(this));
    }
}
