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
import {tap } from 'rxjs/operators';
import { Observable, of, pipe, switchMap, timer } from 'rxjs';
import { ScheduledInvoiceService } from './scheduled-invoice.service';
import { DispatchComponent } from '../dispatch/dispatch.component';
import { PaymentComponent } from '@ss/sales/ui-quick-order';
import { OptionService } from '@ss/logistics/ui-options';
import {MatDialog} from "@angular/material/dialog";
import {QuantityInputComponent} from "../quantity-input-component/quantity-input.component";

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
    #dialog = inject(MatDialog);
    #optionSrv = inject(OptionService);
    #loginSrv = inject(LoginService);
    isInvoicing = signal(false);
    sData = signal<QuickOrder[]>([]);


    // initialize with translation keys for invoice types
    readonly invoiceTypes: Map<number, string> = new Map<number, string>([
        [1, 'COMMON_INVOICE'],
        [2, 'COMMON_DELIVERY'],
    ]);

    displayedColumns = signal<string[]>([
        'number',
        'date',
        'agent',
        'payMethod',
        'mode',
        'description',
        'qty',
        'option',
        'docStatus',
    ]);
    transactionColumns = signal<string[]>([
        'position',
        'store',
        'reference',
        'description',
        'qtyOrdered',
        'qtySatisfied',
        'price',
        'vat',
        'total',
    ]);
    transactions = signal<TransactionLine[]>([]);
    salesOrderLinesSrv = inject(SalesOrderLinesService);
    private weightCaptureSrv = inject(WeightCaptureService);
    public readonly transacPagination = PaginationModel.newInstance();
    readonly dialog = inject(MatDialog);

    transacLineId: number;
    invoiceInfo: InvoiceInfo[] = [];
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
        public override pagPersistSrv: PaginatorPersistenceService) {
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

    protected override preInit(): Observable<unknown> {
        return super.preInit()
            .pipe(
                switchMap(() => this.route.data),
                tap((data) => {
                    const invoicing = data['invoicing'] === true;
                    this.isInvoicing.set(invoicing);
                    this.displayedColumns.set(this.displayedColumns().filter(
                        (col) => col !== 'option' || invoicing,
                    ));
                }),
                tap(() => {
                        this.addButton.visible = false;
                        this.deleteButton.visible = false;
                        this.editButton.visible = this.shellSrv.getEntityRights('QOrder')?.edit === true;
                    }),
                switchMap(() => this.weightCaptureSrv.hasScaleConfig()),
                tap((exists) => {
                    if (exists) {
                        this.transactionColumns.update(v => [...v, 'tare', 'brut']);
                    }
                }),
                switchMap(() =>this.#optionSrv.get(this.#loginSrv.appCtx.center)),
                tap((opt) => {
                    this.transactionColumns.update(v => v.filter(
                        (col) => col !== 'store' || !opt.serviceInvoiceOnly,
                    ));
                }),
                tap(() => this.editButton.visible = this.shellSrv.getEntityRights('QOrder')?.edit || this.#loginSrv.appCtx.manager)
                );
    }


    // protected getInvoiceNumber(id: number) {
    //     return this.invoiceInfo.find((inv) => inv.id === id)?.invoiceNumber;
    // }

    override select(id: number) {
        super.select(id);
        if (id > 0) {
            this.salesOrderLinesSrv.setParentId(id);
            this.loading.set(true);
            this.salesOrderLinesSrv
                .getPage(this.transacPagination)
                // .pipe(
                //     tap((data: TransactionLine[]) => {
                //         data.forEach((line) => {
                //             this.weightCaptureSrv
                //                 .getWeightCapture(line.id)
                //                 .subscribe((captures) => {
                //                     line.tareWeight = captures.tare;
                //                     line.brutWeight = captures.brut;
                //                     this.loading.set(true);
                //                 });
                //         });
                //     }),
                // )
                .subscribe((res) => {
                    this.transactions.set(res);
                    this.loading.set(false);
                });
        }
    }

    generateInvoice(id: number) {
         const dialogRef = this.dialog.open(QuantityInputComponent, {
                             width: '200px',
                             height: '10em',
                             disableClose: true,
                            data: {
                                quantity: 20
                            }
                        });
         this.loading.set(true);
          return dialogRef
              .afterClosed()
              .pipe(switchMap((res: number) => res >= 1 ? this.scheduledInvoiceSrv.generateInvoice(id, res) : of(null)))
              .subscribe({
                next: res => {
                    if (res !== null) {
                        this.refresh();
                        this.snackBarSrv.showSuccessMessage();
                    }
                },
                error: (err) => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                },
            });
    }

    // override processLoadedData(data:QuickOrder[]):Observable<QuickOrder[]>{
    //     return  super.processLoadedData(data)
    //         .pipe(
    //             switchMap(() => {
    //                 const ids = this.data().map((d) => d.id).join(',');
    //                 return this.scheduledInvoiceSrv.getInvoiceInfo(ids);
    //             }),
    //             tap((res: InvoiceInfo[]) => {
    //                 this.invoiceInfo = res;
    //                 data.forEach((d) => {
    //                     d.invoiceNumber = this.getInvoiceNumber(d.id);
    //                 });
    //             }),
    //             switchMap(() => of(data))
    //         );
    // }
    //
    // getInvoices(): void {
    //     const ids = this.data.map((d) => d.id).join(',');
    //     this.scheduledInvoiceSrv
    //         .getInvoiceInfo(ids)
    //         .pipe(tap((res) => (this.invoiceInfo = res)))
    //         .subscribe();
    // }
    //
    // override refresh() {
    //     super.refresh(this.getInvoices.bind(this));
    // }

    reloadTransaction(bool: boolean) {
        if (bool) {
            this.select(this.selectedId());
        }
    }

    selectTransac(id: number) {
        this.transacLineId = id;
    }

    override processLoadedData(data:any):any{
        this.sData.set(data);
        return super.processLoadedData(data);
    }
}
