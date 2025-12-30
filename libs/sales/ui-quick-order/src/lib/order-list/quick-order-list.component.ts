import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
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
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { DatePipe } from '@angular/common';
import { InvoiceInfo, QuickOrder } from '../quick-order.api';
import { QuickOrderService } from '../quick-order.service';
import { InvoiceService } from '@ss/sales/api-invoice';
import { catchError, EMPTY, filter, forkJoin, of, switchMap, tap } from 'rxjs';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'ss-ui-quick-order',
    templateUrl: './quick-order-list.component.html',
    styleUrls: ['./quick-order-list.component.scss'],
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
    ],
})
export class QuickOrderListComponent extends BaseEntityListComponent<QuickOrder> {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'docStatus',
        'invoiceNumber',
        'option',
    ];

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
            'SALES_QUICK_ORDER',
        );
    }
    invoiceSrv = inject(InvoiceService);
    invoiceInfo: InvoiceInfo[] = [];

    getInvoices(): void {
        const ids = this.data.map((d) => d.id).join(',');

        this.quickOrderSrv
            .getInvoiceInfo(ids)
            .pipe(
                tap((res) => (this.invoiceInfo = res)),

                switchMap((items) =>
                    forkJoin(
                        items
                            .filter((item) => item.invoiceNumber)
                            .map((item) =>
                                this.invoiceSrv.get(item.id).pipe(
                                    filter((invoice) => !invoice.invoiceNumber),
                                    switchMap((invoice) =>
                                        this.invoiceSrv.update({
                                            ...invoice,
                                            invoiceNumber: item.invoiceNumber,
                                        }),
                                    ),
                                    catchError((err) => {
                                        return EMPTY;
                                    }),
                                ),
                            ),
                    ),
                ),
            )
            .subscribe();
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

    override refresh() {
        super.refresh(this.getInvoices.bind(this));
    }
}
