import { Component } from '@angular/core';
import { BaseChildEntityListComponent} from '@ss/common/ui-base-entity';
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
import { CRMTeamMember } from '../crm-teams-api.class';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatCheckbox } from '@angular/material/checkbox';
import { TeamsLineService } from '../teams-line.service';

@Component({
    selector: 'ss-crm-teams-lines-list',
    templateUrl: 'crm-teams-lines-list.component.html',
    styleUrls: ['crm-teams-lines-list.component.scss'],
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
        MatMiniFabButton,
        TranslatePipe,
        MatTooltip,
        MatCheckbox
    ]
})
export class CrmTeamsLinesListComponent extends BaseChildEntityListComponent<CRMTeamMember> {

    override displayedColumns = [
        'userDescription'
    ];

    constructor(protected override detailSrv: TeamsLineService) {
        super(detailSrv, 'CRM_TEAMS');
        this.paginator.pageSize = 10;
    }
}

