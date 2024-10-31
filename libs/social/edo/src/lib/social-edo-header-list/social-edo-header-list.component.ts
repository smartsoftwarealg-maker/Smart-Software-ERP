import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { EDOHeader, SocialAid } from '@social/social-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { MedicalAidService } from '@social/social-api';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { EdoHeaderService } from '../../../../social-api/src/lib/services/edo-header.service';

@Component({
    selector: 'ss-social-edo-header-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, UiPaginationModule, MatHeaderCellDef],
    templateUrl: './social-edo-header-list.component.html',
    styleUrl: './social-edo-header-list.component.scss',
})
export class SocialEdoHeaderListComponent extends BaseEntityListComponent<EDOHeader> {
    displayedColumns = [
        'number',
        'date',
        'description'
    ];
    constructor(
        public override entitySrv: EdoHeaderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'SOCIAL_EDO_LIST');
        this.pagination.pageSize = 15;
    }
}

