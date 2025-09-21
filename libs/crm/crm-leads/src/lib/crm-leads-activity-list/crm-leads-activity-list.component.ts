import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow
} from '@angular/material/table';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { CRMLeadActivity } from '../lead-activity-api';
import { CrmLeadActivityService } from '../crm-lead-activity.service';
import { DatePipe } from '@angular/common';
import {MatToolbar} from "@angular/material/toolbar";

@Component({
    selector: 'ss-crm-leads-activity-list',
    templateUrl: 'crm-leads-activity-list.component.html',
    styleUrls: ['crm-leads-activity-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        MatMiniFabButton,
        TranslatePipe,
        MatTooltip,
        DatePipe,
        MatButton
    ]
})
export class CrmLeadsActivityListComponent extends BaseChildEntityListComponent<CRMLeadActivity> {

    override displayedColumns = [
        'subject',
        'activityType',
        'priority',
        'status',
        'dueDate',
        'completionDate',
        'ownerDescription',
        'leadDescription'
    ];

    constructor(protected override detailSrv: CrmLeadActivityService) {
        super(detailSrv, 'CRM_TEAMS');
        this.paginator.pageSize = 10;
    }

    @Output()
    onEdit = new EventEmitter<number>();

    override edit() {
        if (this.selectedId) {
            this.onEdit.emit(this.selectedId);
        }
    }

    add() {
        this.onEdit.emit(0);
    }

    @Input() parentId!: number;

    override ngOnInit() {
        if (this.parentId) {
            this.detailSrv.setParentId(this.parentId);
        }
        super.ngOnInit();
    }

    override showDetail(id: number) {
        this.onEdit.emit(id);
    }
}


