import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { Reimbursement, ReimbursementService } from '@social/social-api';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '@ss/common/ui-lang';
import { MatSort, MatSortHeader } from '@angular/material/sort';

@Component({
    selector: 'ss-social-reimbursements-list',
    standalone: true,
    imports: [CommonModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatHeaderCellDef, MatMiniFabButton, MatTooltip, TranslatePipe, MatSort, MatSortHeader],
    templateUrl: './social-reimbursements-list.component.html',
    styleUrl: './social-reimbursements-list.component.scss',
})
export class SocialReimbursementsListComponent extends BaseChildEntityListComponent<Reimbursement> {
    #_computed = effect(() => {
        if (this.detailSrv.selectedId() >=0) {
            this.refresh();
        }
    });

    override displayedColumns = ['reference', 'date', 'amount'];

    constructor(protected override detailSrv: ReimbursementService) {
        super(detailSrv, 'Reimbursement');
    }
}
