import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Lookup } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { SocialActivity, SocialActivityLookupService, SocialActivityService } from '@social/social-api';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';

import { MutualRejectionsService } from '../../../../social-api/src/lib/services/mutual-rejections.service';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-rejections-list',
    standalone: true,
    imports: [CommonModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatHeaderCellDef, PaginationComponent, TranslateDirective],
    templateUrl: './mutual-rejections-list.component.html',
    styleUrl: './mutual-rejections-list.component.scss',
})
export class MutualRejectionsListComponent extends BaseEntityListComponent<Lookup> {
    displayedColumns = [
        'description',
        'descriptionAr',
        'value'
    ]
    constructor(
        public override entitySrv: MutualRejectionsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'SOCIAL_MUTUAL_REJECTIONS');
        this.pagination.pageSize = 15;
    }
}
