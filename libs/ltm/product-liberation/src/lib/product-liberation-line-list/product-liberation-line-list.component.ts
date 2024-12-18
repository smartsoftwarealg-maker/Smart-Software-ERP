import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent, BaseEntityListComponent } from '@ss/common/ui-base-entity';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
    LTMProductLiberationLine, LtmProductLiberationLineService, LtmProductLiberationService, LTMTestEquipmentTest
} from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
    selector: 'ss-product-liberation-list',
    standalone: true,
    imports: [
        CommonModule,
        PaginationComponent,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        MatHeaderCellDef,
        TranslateDirective,
        TranslatePipe,
        MatTooltip,
        MatMiniFabButton,
    ],
    templateUrl: './product-liberation-line-list.component.html',
    styleUrl: './product-liberation-line-list.component.scss',
})
export class ProductLiberationLineListComponent extends BaseChildEntityListComponent<LTMProductLiberationLine> {
    override displayedColumns = ['product', 'silo', 'type'];

    constructor(public entitySrv: LtmProductLiberationLineService) {
        super(entitySrv, 'LTMProductLiberation');
    }
}
