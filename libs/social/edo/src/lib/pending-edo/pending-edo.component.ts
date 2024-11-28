import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { SocialActivityService, SocialAid } from '@social/social-api';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';

import { MatMiniFabButton } from '@angular/material/button';
import { PendingEdoService } from '@social/social-api';
import { switchMap } from 'rxjs';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { FormControl } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-pending-edo',
    standalone: true,
    imports: [
        CommonModule,
        PaginationComponent,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable, MatHeaderCellDef,
        MatMiniFabButton,
        MatFormField,
        CommonUiAutoCompleteModule,
        MatLabel,
        MaterialModule],
    templateUrl: './pending-edo.component.html',
    styleUrl: './pending-edo.component.scss',
})
export class PendingEdoComponent extends BaseChildEntityListComponent<SocialAid> {
    #activitySrv = inject(SocialActivityService);
    activityLookup = new DefaultAutoCompleteModel(this.#activitySrv);

    aidType = new FormControl<number>(0);
    lineAdded = output<number>();
    edoId = input<number>(0);
    override displayedColumns = [
        'action',
        'number',
        'date',
        'firstName',
        'lastName',
        'amount',
        'description',
        'typeDescription'
    ];

    constructor(public entitySrv: PendingEdoService) {
        super(entitySrv, 'SocialAid');
        this.activityLookup.onObjectSelected = e => {
            this.entitySrv.aidType = e?.id;
            this.refresh();
        }
        this.aidType.setValue(this.entitySrv.aidType||0);
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
