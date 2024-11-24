import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/master-data/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {InvoiceLinesService} from '@ss/sales/api-invoice';
import {BaseTransactionLinesListComponent} from '@ss/logistics/api-transaction';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, DecimalPipe } from '@angular/common';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';
import { DocInfoComponent } from '../../../../../logistics/ui-doc-info/src/lib/doc-info/doc-info.component';
import { TranslatePipe } from '../../../../../common/ui-lang/src/lib/translate.pipe';

@Component({
    selector: 'ss-invoice-lines-list',
    templateUrl: './invoice-lines-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-list.scss'],
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        MatMiniFabButton,
        MatTooltip,
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatIconButton,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DocInfoComponent,
        DecimalPipe,
        TranslatePipe,
    ],
})
export class InvoiceLinesListComponent extends BaseTransactionLinesListComponent implements OnInit {

    displayedColumns = [
        'position',
        'store',
        'reference',
        'description',
        'qtyOrdered',
        'qtySatisfied',
        'price',
        'vat',
        'total'

    ];

    constructor(
        public override detailSrv: InvoiceLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override articleSrv: ArticleService,
        public override storeNamesSrv: LotsService,
        public override confirmationSrv: ConfirmationDialogService) {
        super(detailSrv, shellSrv, snackBarSrv, route, router, articleSrv, storeNamesSrv, confirmationSrv);
    }
}
