import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ArticleService } from '@ss/master-data/api-article';
import { LotsService } from '@ss/common/api-lookup';
import { BaseTransactionLinesListComponent } from '@ss/logistics/api-transaction';
import { ProductionOrderLinesService } from '../production-order-services/production-order-lines.service';
import { DecimalPipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { OptionService } from '@ss/logistics/ui-options';
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
    selector: 'ss-production-order-lines-list',
    templateUrl: './production-order-lines-list.component.html',
    styleUrls: ['./production-order-lines-list.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        FormsModule,
        ReactiveFormsModule,
        MatMiniFabButton,
        MatTooltip,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatIconButton,
        MatHeaderRow,
        MatRow,
        PaginationComponent,
        DocInfoComponent,
        DecimalPipe,
        TranslatePipe,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        MatProgressSpinner,
    ],
})
export class ProductionOrderLinesListComponent
    extends BaseTransactionLinesListComponent
    implements OnInit
{
    #optionSrv = inject(OptionService);
    override displayedColumns = signal<string[]>([
        'position',
        'reference',
        'description',
        'qtyOrdered',
        'units',
        'qtySatisfied',
        'storeDescription',
        'storeName',
        // 'price',
        // 'total',
    ]);

    constructor(
        public override detailSrv: ProductionOrderLinesService,
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

    reserve() {
        this.detailSrv.reserve(this.selectedId()).subscribe({
            next: () => {
                this.snackBarSrv.showSuccessMessage();
            },
            error: (err) => {
                this.snackBarSrv.showFailureMessage();
                throw err;
            },
        });
    }

    release() {
        this.confirmationSrv
            .confirm('PROD_RELEASE_CONFIRMATION', 'PROD_RELEASE_CONFIRMATION')
            .subscribe((res) => {
                if (res) {
                    this.detailSrv.release(this.selectedId()).subscribe({
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

    override ngOnInit() {
        super.ngOnInit();

        this.#optionSrv.get(this.loginSrv.appCtx.center).subscribe((res) => {
            this.usesUnits.set(res.usesUnits);
            this.displayedColumns.update(cols => cols.filter(
                (e) => res.usesUnits || e !== 'units',
            ));
        });
    }
}
