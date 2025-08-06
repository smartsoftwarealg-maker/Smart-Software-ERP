import { Component } from '@angular/core';
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
    MatRowDef, MatTable,
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { MissionElementPricing } from '../mission-elements-api.class';
import { MissionsElementPricingService } from '../mission-elementPricing.service';
import {MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
    selector: 'ss-mission-elements-lines-list',
    imports: [
        CommonModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        PaginationComponent,
        TranslateDirective,
        MatHeaderCellDef,
        TranslatePipe,
        MatTable,
        MatTooltip,
        MatMiniFabButton,
    ],
    templateUrl: './mission-elements-lines-list.component.html',
    styleUrl: './mission-elements-lines-list.component.scss',
    standalone: true,
})
export class MissionElementsLinesListComponent extends BaseChildEntityListComponent<MissionElementPricing> {
    override displayedColumns = [
        'zoneDescription',
        'categoryDescription',
        'amount',
    ];

    constructor(protected override detailSrv: MissionsElementPricingService) {
        super(detailSrv, 'MISSION_MISSION_ELEMENT_DETAIL');
        this.paginator.pageSize = 10;
    }
}
