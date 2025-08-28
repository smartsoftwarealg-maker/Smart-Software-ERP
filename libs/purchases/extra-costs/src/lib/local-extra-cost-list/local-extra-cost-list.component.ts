import { Component } from '@angular/core';
import { ExtraCostService } from '@ss/purchases/extra-costs';
import { ExtraCost } from '@ss/logistics/api-transaction';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { DecimalPipe, DatePipe, AsyncPipe } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-local-extra-costs-list',
    templateUrl: './local-extra-cost-list.component.html',
    styleUrls: ['./local-extra-cost-list.component.scss'],
    standalone: true,
    imports: [
        MatMiniFabButton,
        MatTooltip,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DecimalPipe,
        DatePipe,
        TranslatePipe,
        AsyncPipe
    ]
})
export class LocalExtraCostListComponent extends BaseChildEntityListComponent<ExtraCost> {

    override displayedColumns = [
        'reference',
        'supplierName',
        'amount',
        'vat',
    ];

    constructor(protected override detailSrv: ExtraCostService) {
        super(detailSrv, 'ExtraCost');
    }
}
