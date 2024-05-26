import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { Reimbursement, ReimbursementService } from '@social/social-api';
import { CommonUiLangModule } from '@ss/common/ui-lang';
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

@Component({
    selector: 'ss-social-reimbursements-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatHeaderCellDef, MatMiniFabButton, MatTooltip],
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
