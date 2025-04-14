import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { SocialAid } from '@social/social-api';
import { PersonAidHistoryService } from '@social/social-api';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';

import { MatMiniFabButton } from '@angular/material/button';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-aid-history',
    standalone: true,
    imports: [CommonModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatHeaderCellDef, PaginationComponent, TranslateDirective],
    templateUrl: './aid-history.component.html',
    styleUrl: './aid-history.component.scss',
})
export class AidHistoryComponent extends BaseChildEntityListComponent<SocialAid> {
    override displayedColumns = [
        'medicalTypeDescription',
        'number',
        'date',
        'amount',
        'installmentCount'
    ];

    constructor(public entitySrv: PersonAidHistoryService) {
        super(entitySrv, 'SocialAid');
    }
}
