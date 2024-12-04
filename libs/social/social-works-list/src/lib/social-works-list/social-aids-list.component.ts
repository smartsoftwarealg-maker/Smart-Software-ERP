import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { SocialAid, SocialWorksService } from '@social/social-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-social-works-list',
    standalone: true,
    imports: [CommonModule, TranslateDirective, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatHeaderCellDef, PaginationComponent],
    templateUrl: './social-aids-list.component.html',
    styleUrl: '../../../../social-api/src/lib/aids.styles.scss',
})
export class SocialAidsListComponent extends BaseEntityListComponent<SocialAid> {
    displayedColumns = [
        'typeDescription',
        'number',
        'date',
        'firstName',
        'lastName',
        'amount',
        'installmentCount'
    ]
    constructor(
        public override entitySrv: SocialWorksService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'SOCIAL_WORKS');
        this.pagination.pageSize = 15;
    }
}
