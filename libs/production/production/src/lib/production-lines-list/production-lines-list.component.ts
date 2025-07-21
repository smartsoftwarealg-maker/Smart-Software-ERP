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
import { ReactiveFormsModule } from '@angular/forms';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { TranslatePipe } from '@ss/common/ui-lang';
import { ProductionLinesService } from '../production-services/production-lines.service';
import { ProductionService } from '../production-services/production.service';
import { AccTransactionLineService } from '@ss/accounting/accounting-api';
import { of, switchMap } from 'rxjs';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-production-lines-list',
    templateUrl: './production-lines-list.component.html',
    styleUrl: './production-lines-list.component.scss',
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
export class ProductionLinesListComponent extends BaseTransactionLinesListComponent implements OnInit {
    private productionSrv = inject(ProductionService);

    override displayedColumns = [
        'position',
        'reference',
        'description',
        'qtyOrdered',
        'qtySatisfied',
        'storeDescription',
        'storeName',
        'price',
        'total',
        'action',
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
            next: data => {
                this.data = data;
            },
            error: () => {
                this.snackBarSrv.showFailureMessage('refresh failed');
            }
        });
    }

    public produce(id: number) {
        this.productionSrv.produce(id).subscribe({
            next:()=>{
                this.snackBarSrv.showSuccessMessage();
                this.refresh();
            },
            error:(err)=>{
                this.snackBarSrv.showFailureMessage();
                throw err;
            }
        });
    }

    public cancel(id: number) {
        this.confirmationSrv
            .confirm('COMMON_CANCEL', 'PROD_CANCEL_PRODUCTION')
            .pipe(switchMap(res => res ? this.productionSrv.cancel(id) : of(null)))
            .subscribe({
                next: () => {
                    this.snackBarSrv.showSuccessMessage();
                    this.refresh();
                },
                error: (err) => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                }
            });
    }
}
