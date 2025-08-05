import { Component } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
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
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { MissionJourney } from '../journey-api.class';
import { JourneyLineService } from '../journey.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';

@Component({
    selector: 'ss-missions-expenses-line-list',
    templateUrl: './mission-expenses-list.component.html',
    styleUrls: ['./mission-expenses-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        AsyncPipe,
        MatMiniFabButton,
        TranslatePipe,
        MatTooltip,
        MatTabGroup,
        MatTab,
        MatTabLabel,
        DatePipe,
    ],
})
export class MissionExpensesLineListComponent extends BaseChildEntityListComponent<MissionJourney> {
    override displayedColumns = ['from', 'to'];

    constructor(protected override detailSrv: JourneyLineService) {
        super(detailSrv, 'MISSION_EXPENSES');
    }


}
