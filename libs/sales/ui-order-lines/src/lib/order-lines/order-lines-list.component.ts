import { Component, inject, OnInit, signal } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ArticleService } from '@ss/master-data/api-article';
import { LotsService } from '@ss/common/api-lookup';
import {
    BaseTransactionLinesListComponent,
    SalesOrderLinesService,
    TransactionLine,
} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';

import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import {
    WeightCaptureDialogButtonComponent,
    WeightCaptureService,
} from '@ss/sales/weight-capture';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { QuickOrderService } from '@ss/sales/ui-quick-order';

@Component({
    selector: 'ss-order-lines-list',
    templateUrl: './order-lines-list.component.html',
    styleUrls: [
        '../../../../../common/assets/src/assets/transac-lines-list.scss',
        'order-lines-list.component.scss',
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
    private weightCaptureSrv = inject(WeightCaptureService);
    private quickOrderSrv = inject(QuickOrderService);

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
    protected isInvoice = signal(false);
    protected isManager = signal(false);

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
        this.route.data.subscribe(({ source }) => {
            this.displayedColumns = this.displayedColumns.filter(
                (col) => col !== 'store' || source !== 'quick',
            );
        });

        this.weightCaptureSrv.hasScaleConfig().subscribe({
            next: (exists) => {
                if (exists) {
                    this.displayedColumns.push('tare', 'brut');
                }
            },
            error: () => {},
        });
        this.quickOrderSrv
            .getInvoiceInfo(this.detailSrv.getParentId() + '')
            .subscribe({
                next: (invoiceInfo) =>
                    this.isInvoice.set(
                        invoiceInfo[0].invoiceNumber > 0 &&
                            !this.loginSrv.appCtx.manager,
                    ),
            });
        super.ngOnInit();
    }

    public override loadDetailLines(): Observable<TransactionLine[]> {
        return super.loadDetailLines().pipe(
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
        );
    }

    refresh(bool: boolean) {
        if (bool) {
            this.loadDetailLines().subscribe({
                next: (data) => {
                    this.data = data;
                },
            });
        }
    }
}
