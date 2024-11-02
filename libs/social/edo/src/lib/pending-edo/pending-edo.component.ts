import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { SocialAid } from '@social/social-api';
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
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { PendingEdoService } from '@social/social-api';
import { map, of, switchMap } from 'rxjs';

@Component({
    selector: 'ss-pending-edo',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTooltip, UiPaginationModule, MatHeaderCellDef, MatMiniFabButton, MatButton],
    templateUrl: './pending-edo.component.html',
    styleUrl: './pending-edo.component.scss',
})
export class PendingEdoComponent extends BaseChildEntityListComponent<SocialAid> {
    lineAdded = output<number>();
    edoId = input<number>(0);
    override displayedColumns = [
        'action',
        'number',
        'date',
        'firstName',
        'lastName',
        'description',
        'amount',
    ];

    constructor(public entitySrv: PendingEdoService) {
        super(entitySrv, 'SocialAid');
    }

    addAll() {
        this.data$
            .pipe(switchMap(res => this.entitySrv.addLines(this.edoId(), res)))
            .subscribe(res => {
                if (res.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                    this.refresh();
                    this.lineAdded.emit(res.count);
                }
            })
    }

    add(e: SocialAid) {
        this.entitySrv
            .addLines(this.edoId(), [e])
            .subscribe(res => {
                if (res.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                    this.refresh();
                    this.lineAdded.emit(res.count);
                }
            });
    }
}
