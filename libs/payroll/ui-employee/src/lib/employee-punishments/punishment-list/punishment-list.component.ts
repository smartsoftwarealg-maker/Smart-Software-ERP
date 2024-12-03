import {Component} from '@angular/core';
import {Punishment} from '../punishment-api';
import {PunishmentService} from '../punishment.service';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '../../../../../../common/ui-pagination/src/lib/pagination.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '../../../../../../common/ui-lang/src/lib/translate.pipe';

@Component({
    selector: 'ss-punishment-list',
    templateUrl: './punishment-list.component.html',
    styleUrls: ['./punishment-list.component.scss'],
    standalone: true,
    imports: [MatMiniFabButton, MatTooltip, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, DatePipe, TranslatePipe]
})
export class PunishmentListComponent extends BaseChildEntityListComponent<Punishment>{
    public displayedColumns = [
        'number',
        'date',
        'sanction',
        'typeName',
        'faultName',
        'memo',
    ];

    constructor(public entitySrv: PunishmentService) {
        super(entitySrv, 'Punishment');
    }
}
