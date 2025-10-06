import { Component} from '@angular/core';
import { CRMQuote } from '../quotes-api';
import { CrmQuotesService } from '../crm-quotes.service';
import { BaseChildEntityListComponent} from '@ss/common/ui-base-entity';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'ss-crm-quotes-list',
    standalone: true,
    imports: [
        DatePipe,
        DecimalPipe,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        PaginationComponent,
        TranslateDirective,
        TranslatePipe,
        MatHeaderCellDef,
        AsyncPipe,
        MatMiniFabButton,
        MatTooltip
    ],
    templateUrl: './crm-quotes-list.component.html',
    styleUrl: './crm-quotes-list.component.scss'
})
export class CrmQuotesListComponent extends BaseChildEntityListComponent<CRMQuote> {
    displayedColumns = [
        'number',
        'date',
        'user'
    ];
    constructor(protected override detailSrv: CrmQuotesService) {
        super(detailSrv, 'CrmQuotesList' );
    }
    ngOnInit() {
        super.ngOnInit();
        this.refresh();
    }
}
