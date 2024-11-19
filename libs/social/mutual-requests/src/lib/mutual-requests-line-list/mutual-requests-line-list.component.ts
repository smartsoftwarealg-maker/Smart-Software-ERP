import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent, BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { MutualRequest, MutualRequestLine, MutualRequestLineService, MutualRequestService } from '@social/social-api';
import { BankService } from '@ss/administration/api-bank';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { LtmMixtureDetailService } from '@ltm/ltm-api';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
    selector: 'ss-mutual-requests-line-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, UiPaginationModule, MatHeaderCellDef, MatTooltip, MatMiniFabButton],
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
