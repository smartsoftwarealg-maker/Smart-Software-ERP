import { Component, Input } from '@angular/core';
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
import { CrmLeadsTrackingService } from '../crm-leads-tracking.service';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { CRMLeadsProgressLogger } from '../api';

@Component({
    selector: 'ss-crm-leads-tracking-list',
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
    templateUrl: './crm-leads-tracking-list.component.html',
    styleUrls: ['./crm-leads-tracking-list.component.scss'],
    standalone: true,
})
export class CrmLeadsTrackingListComponent extends BaseChildEntityListComponent<CRMLeadsProgressLogger> {
    @Input() parentId!: number;
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

    constructor(protected override detailSrv: CrmLeadsTrackingService) {
        super(detailSrv, 'CrmLeadActiveListLine');
    }
    override ngOnInit() {
        if (this.parentId) {
            this.detailSrv.setParentId(this.parentId);
        }
        super.ngOnInit();
    }
}
