import { Component, inject, signal } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    LoginService,
    MaterialModule,
    PaginationModel,
    PaginatorPersistenceService, UserRightsService,
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
import { InvoiceInfo, QuickOrder } from '@ss/sales/ui-quick-order';
import {
    SalesOrderLinesService,
    TransactionLine,
} from '@ss/logistics/api-transaction';
import {
    WeightCaptureDialogButtonComponent,
    WeightCaptureService,
} from '@ss/sales/weight-capture';
import { delay, tap } from 'rxjs/operators';
import { of, pipe, switchMap, timer } from 'rxjs';
import { ScheduledInvoiceService } from './scheduled-invoice.service';
import { DispatchComponent } from '../dispatch/dispatch.component';
import { PaymentComponent } from '../../../../ui-quick-order/src/lib/payment/payment.component';
import { OptionService } from '@ss/logistics/ui-options';
import {AccessRightsService} from "@ss/common/api-access-rights";

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
        WeightCaptureDialogButtonComponent,
        DispatchComponent,
        PaymentComponent,
    ],
})
export class OrderInvoicingComponent extends BaseEntityListComponent<QuickOrder> {
    #optionSrv = inject(OptionService);
    #loginSrv = inject(LoginService);
    isInvoicing = signal(false);

    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'mode',
        'description',
        'qty',
        'invoiceNumber',
        'option',
        'docStatus',
    ];
    transactionColumns = [
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
    // public rightsSrv: AccessRightsService
    #userRightsSrv = inject(UserRightsService);
    constructor(
        public scheduledInvoiceSrv: ScheduledInvoiceService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            scheduledInvoiceSrv,
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
        this.editButton.visible = this.shellSrv.getEntityRights('QOrder')?.edit;
        this.#loginSrv.appCtx.rightsCenter;
        this.route.data.subscribe((data) => {
            const invoicing = data['invoicing'] === true;
            this.isInvoicing.set(invoicing);
            this.displayedColumns = this.displayedColumns.filter(
                (col) => col !== 'option' || invoicing,
            );
        });
        this.weightCaptureSrv
            .hasScaleConfig()
            .pipe(
                tap((exists) => {
                    if (exists) {
                        this.transactionColumns.push('tare', 'brut');
                    }
                }),
                switchMap(() =>
                    this.#optionSrv.get(this.#loginSrv.appCtx.center),
                ),
            )
            .subscribe({
                next: (opt) => {
                     this.transactionColumns = this.transactionColumns.filter(
                        (col) => col !== 'store' || !opt.serviceInvoiceOnly,
                    );
                },
                error: () => {},
            });
        super.ngOnInit();
        timer(2000).subscribe(() => this.editButton.visible =  this.shellSrv.getEntityRights('QOrder')?.edit||this.#loginSrv.appCtx.manager);
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

    transacLineId: number;
    invoiceInfo: InvoiceInfo[] = [];

    getInvoiceNumber(id: number) {
        return this.invoiceInfo.find((inv) => inv.id === id)?.invoiceNumber;
    }

    override select(id: number) {
        super.select(id);
        //this.selected = id;
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
        this.confirmationSrv
            .confirm('SALES_ORDER_INVOICING', 'SALES_GENERATE_INVOICE')
            .pipe(
                switchMap((confirm: boolean) => {
                    if (confirm) {
                        return this.scheduledInvoiceSrv.generateInvoice(id);
                    } else {
                        return of();
                    }
                }),
            )
            .subscribe({
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
        this.scheduledInvoiceSrv
            .getInvoiceInfo(ids)
            .pipe(tap((res) => (this.invoiceInfo = res)))
            .subscribe();
    }

    override refresh() {
        super.refresh(this.getInvoices.bind(this));
    }

    reloadTransaction(bool: boolean) {
        if (bool) {
            this.select(this.selected);
        }
    }

    selectTransac(id: number) {
        this.transacLineId = id;
    }
}
