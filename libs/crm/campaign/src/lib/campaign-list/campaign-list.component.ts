import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
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
    MatRow,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { CompaignService } from '../compaign.service';
import { Campaign } from '../campaign.api';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'ss-campaign-list',
    templateUrl: 'campaign-list.html',
    styleUrls: ['campaign-list.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DatePipe,
    ],
})
export class CampaignListComponent extends BaseEntityListComponent<Campaign> {
    displayedColumns = [
        'name',
        'cType',
        'status',
        'description',
        'audienceSize',
        'startDate',
        'endDate',
        'owner',
        'budget',
    ];

    // displayedColumns = ['name', 'cType', 'status', 'description', 'audienceQuery', 'audienceSize', 'tag', 'startDate', 'endDate', 'budget', 'actualCost', 'expectedRevenue', 'channels'];

    constructor(
        public override entitySrv: CompaignService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'CRM_CAMPAIGNS',
        );
    }
}
