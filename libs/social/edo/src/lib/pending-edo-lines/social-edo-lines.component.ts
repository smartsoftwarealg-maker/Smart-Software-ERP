import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { EDOLine, SocialAid } from '@social/social-api';
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
import { EdoLineService } from '../../../../social-api/src/lib/services/edo-line.service';
import { map } from 'rxjs';

@Component({
    selector: 'ss-social-edo-lines',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTooltip, UiPaginationModule, MatHeaderCellDef, MatMiniFabButton],
    templateUrl: './social-edo-lines.component.html',
    styleUrl: './social-edo-lines.component.scss',
})
export class SocialEdoLinesComponent extends BaseChildEntityListComponent<EDOLine> {
    lineRemoved = output<number>();
    override displayedColumns = [
        'action',
        'firstName',
        'lastName',
        'amount',
    ];

    constructor(public entitySrv: EdoLineService) {
        super(entitySrv, 'SocialAid');
    }

    remove(line: EDOLine) {
        this.entitySrv
            .remove(line?.id)
            .subscribe(res => {
                if (res.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                    this.refresh();
                    this.lineRemoved.emit(res.count);
                }
            });
    }
}
