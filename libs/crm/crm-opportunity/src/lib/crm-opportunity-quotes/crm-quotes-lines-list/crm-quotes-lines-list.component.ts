import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from '@angular/material/table';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { CRMQuoteItem } from '../quotes-api';
import { CrmQuoteItemsService } from '../crm-quote-item.service';

@Component({
    selector: 'ss-crm-quotes-lines-list',
    standalone: true,
    imports: [
        CommonModule,
        MatTooltip,
        TranslateDirective,
        TranslatePipe,
        MatMiniFabButton,
        MatTable,
        MatHeaderCell,
        MatCell,
        MatColumnDef,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRow,
        MatRow,
        MatRowDef,
        MatHeaderRowDef
    ],
    templateUrl: './crm-quotes-lines-list.component.html',
    styleUrl: './crm-quotes-lines-list.component.scss'
})
export class CrmQuotesLinesListComponent extends BaseChildEntityListComponent<CRMQuoteItem> {
    override displayedColumns = [
        'reference',
        'quantity',
        'listPrice',
        'unitPrice'
    ];

    constructor(protected override detailSrv: CrmQuoteItemsService) {
        super(detailSrv, 'CrmQuoteItemListLine');
    }


}
