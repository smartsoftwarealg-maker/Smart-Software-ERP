import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { SocialAid } from '@social/social-api';
import { AssetAppointmentService } from '../../../../../assets-component/src/lib/services/asset-appointment.service';
import { PersonAidHistoryService } from '../../../../social-api/src/lib/services/person-aid-history.service';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
    selector: 'ss-aid-history',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTooltip, UiPaginationModule, MatHeaderCellDef, MatMiniFabButton],
    templateUrl: './aid-history.component.html',
    styleUrl: './aid-history.component.scss',
})
export class AidHistoryComponent extends BaseChildEntityListComponent<SocialAid> {
    override displayedColumns = [
        'medicalTypeDescription',
        'number',
        'date',
        'amount',
        'installmentCount'
    ];

    constructor(public entitySrv: PersonAidHistoryService) {
        super(entitySrv, 'SocialAid');
    }
}
