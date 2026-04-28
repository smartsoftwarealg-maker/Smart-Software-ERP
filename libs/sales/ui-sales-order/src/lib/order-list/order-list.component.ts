import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { SalesOrderService } from '@ss/sales/api-sales-order';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { Transaction } from '@ss/logistics/api-transaction';
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
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { DatePipe } from '@angular/common';
import { InvoiceInfo } from '@ss/sales/ui-quick-order';
import { tap } from 'rxjs';
import { QuickOrderService } from '@ss/sales/ui-quick-order';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { WeightCaptureService } from '@ss/sales/weight-capture';
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
    selector: 'ss-ui-order',
    templateUrl: './order-list.component.html',
    styleUrls: [
        '../../../../../common/assets/src/assets/transac-list.scss',
        'order-list.component.scss',
    ],
    standalone: true,
    imports: [
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatCheckbox,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DocInfoComponent,
        DatePipe,
        MatIconButton,
        MatTooltip,
        MatProgressSpinner,
    ],
})
export class OrderListComponent extends BaseEntityListComponent<Transaction> {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        // 'dirty',
        // 'locked',
        'docStatus',
        'invoiceNumber',
    ];

    constructor(
        public orderSrv: SalesOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            orderSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'SALES_ORDER',
        );
    }
    weightCaptureSrv = inject(WeightCaptureService);
    quickOrderSrv = inject(QuickOrderService);
    invoiceInfo: InvoiceInfo[] = [];

    override refresh() {
        super.refresh(this.getInvoices.bind(this));
    }

    getInvoices(): void {
        this.setLoading(true);
        const ids = this.data.map((d) => d.id).join(',');

        this.quickOrderSrv
            .getInvoiceInfo(ids).subscribe({
            next: (res) => {
                this.invoiceInfo = res;
                this.setLoading(false);
            },
            error: (err) => {
                this.setLoading(false);
                throw err;
            },
        });
    }

    getInvoiceNumber(id: number) {
        return this.invoiceInfo.find((inv) => inv.id === id)?.invoiceNumber;
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

    override ngOnInit() {
        super.ngOnInit();
        this.weightCaptureSrv.hasScaleConfig().subscribe({
            next: (exists) => {
                if (exists) {
                    this.displayedColumns.push('option')
                }
            },
            error: () => {},
        });
    }
}
