import { Component, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ArticleService } from '@ss/master-data/api-article';
import { LotsService } from '@ss/common/api-lookup';
import { InvoiceLinesService } from '@ss/sales/api-invoice';
import { BaseTransactionLinesListComponent } from '@ss/logistics/api-transaction';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { TranslatePipe } from '@ss/common/ui-lang';
import {WeightCaptureDialogButtonComponent} from '@ss/sales/weight-capture';


@Component({
    selector: 'ss-invoice-lines-list',
    templateUrl: './invoice-lines-list.component.html',
    styleUrls: [
        '../../../../../common/assets/src/assets/transac-lines-list.scss',
    ],
    standalone: true,
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
        MatHeaderRowDef,
        MatRowDef,
        MatCellDef,
        MatHeaderCellDef,
        WeightCaptureDialogButtonComponent,
    ],
})
export class InvoiceLinesListComponent
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
        public override detailSrv: InvoiceLinesService,
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
}
