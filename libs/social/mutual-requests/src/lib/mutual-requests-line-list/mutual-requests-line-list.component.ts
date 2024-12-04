import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { MutualRequestLine, MutualRequestLineService } from '@social/social-api';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';

import { MatTooltip } from '@angular/material/tooltip';
import { MatMiniFabButton } from '@angular/material/button';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-mutual-requests-line-list',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        PaginationComponent,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        MatHeaderCellDef,
        MatTooltip,
        MatMiniFabButton,
        TranslatePipe
    ],
    templateUrl: './mutual-requests-line-list.component.html',
    styleUrl: './mutual-requests-line-list.component.scss',
})
export class MutualRequestsLineListComponent extends BaseChildEntityListComponent<MutualRequestLine> {
    override displayedColumns = [
        'firstName',
        'lastName',
        'mutualNo',
        'folderCount',
        'rejectionDescription'
    ];

    constructor(protected override detailSrv: MutualRequestLineService) {
        super(detailSrv, 'MutualRequestLine');
    }
}
