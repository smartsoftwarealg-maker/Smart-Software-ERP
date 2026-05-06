import { Component, inject, OnInit } from '@angular/core';
import {  WorkCenterActivityService } from '../work-center-services/work-center-activity.service';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import {
    MatTable, MatColumnDef,
    MatHeaderCell, MatCell,
    MatHeaderRow, MatRow,
    MatHeaderCellDef, MatCellDef,
    MatHeaderRowDef, MatRowDef,
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import {TranslateDirective, TranslatePipe} from '@ss/common/ui-lang';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { PaginationModel } from '@ss/common/api-common';
import {WorkCenterActivity} from "../work-center-services/work-center-api";
import {DocInfoComponent} from "@ss/logistics/ui-doc-info";

@Component({
    selector: 'ss-work-center-activity-list',
    templateUrl: './work-center-activity-list.component.html',
    styleUrl: './work-center-activity-list.component.scss',
    standalone: true,
    imports: [
        MatTooltip, TranslatePipe,
        MatMiniFabButton,
        MatTable, MatColumnDef,
        MatHeaderCell, MatCell,
        MatCellDef, MatHeaderCellDef,
        MatHeaderRow, MatRow,
        MatRowDef, MatHeaderRowDef,
        PaginationComponent, TranslateDirective
    ],
})
export class WorkCenterActivityListComponent
    extends BaseChildEntityListComponent<WorkCenterActivity>
    implements OnInit
{
    public override displayedColumns = [
        'activityTypeId',
        'formulaFactor',
        'baseUnit',
        'priority',
        'isActive',
    ];

    constructor(public override detailSrv: WorkCenterActivityService) {
        super(detailSrv, 'activitiesList');
    }

    override showDetail(id: number) {
        this.router.navigate(
            ['activity-detail', id || 0],
            { relativeTo: this.route.parent }
        ).then();
    }

    public readonly pagination = PaginationModel.newInstance();
}
