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
    MatTable,
} from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CrmOpportunityTrackingService } from '../crm-opportunity-tracking.service';
import { CRMOpportunityProgressLogger } from '../api';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-crm-opportunity-tracking-list',
    imports: [
        CommonModule,
        TranslateDirective,
        MatTable,
        MatHeaderCell,
        MatCell,
        MatColumnDef,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRow,
        MatRow,
        MatRowDef,
        MatHeaderRowDef,
        PaginationComponent,
    ],
    templateUrl: './crm-opportunity-tracking-list.component.html',
    styleUrl: './crm-opportunity-tracking-list.component.scss',
    standalone: true,
})
export class CrmOpportunityTrackingListComponent extends BaseChildEntityListComponent<CRMOpportunityProgressLogger> {
    override displayedColumns = [
        'ownerDescription',
        'status',
        'stage',
        'priority',
        'amount',
        'closedBy',
        'memo',
        'teamDescription',
    ];

    constructor(protected override detailSrv: CrmOpportunityTrackingService) {
        super(detailSrv, 'CrmOpportunityActiveListLine');
    }
}
