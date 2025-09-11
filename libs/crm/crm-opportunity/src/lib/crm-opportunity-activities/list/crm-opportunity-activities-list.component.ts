import { Component, inject } from '@angular/core';
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
import { MatMiniFabButton } from '@angular/material/button';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatTooltip } from '@angular/material/tooltip';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CrmOpportunityActiveService } from '../crm-opportunity-active.service';
import { LanguageService } from '@ss/common/api-common';
import {CRMOpportunityActivity} from "../api";
import {PaginationComponent} from "@ss/common/ui-pagination";

@Component({
    selector: 'ss-crm-opportunity-activity-list',
    imports: [
        CommonModule,
        MatTooltip,
        TranslateDirective,
        TranslatePipe,
        MatMiniFabButton,
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
    templateUrl: './crm-opportunity-activities-list.component.html',
    styleUrl: './crm-opportunity-activities-list.component.scss',
    standalone: true,
})
export class CrmOpportunityActivitiesListComponent extends BaseChildEntityListComponent<CRMOpportunityActivity> {
    override displayedColumns = [
        'activityType',
        'subject',
        'detail',
        'priority',
        'status',
        'ownerDescription',
        'opportunityDescription',
    ];

    constructor(protected override detailSrv: CrmOpportunityActiveService) {
        super(detailSrv, 'CrmOpportunityActiveListLine');
    }
}
