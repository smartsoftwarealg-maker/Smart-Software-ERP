import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Motive, Scale } from '../gica-careers-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MotiveService } from '../services/motive.service';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';

import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ScaleService } from '../services/scale.service';

@Component({
    selector: 'ss-gica-scale-detail',
    standalone: true,
    imports: [CommonModule,  MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable,  MatCard, MatCardContent, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
    templateUrl: './scale-detail.component.html',
    styleUrl: './scale-detail.component.css'
})
export class ScaleDetailComponent extends BaseEntityDetailComponent<Scale> {
    constructor(
        public override entitySrv: ScaleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_MOTIVES');
    }
    public override setupForm(b: Scale): UntypedFormGroup {
        return this.formBuilder.group({
            id:    [b.id],
            from:  [b.from, Validators.required],
            to:    [b.to, Validators.required],
            rate:  [b.rate, Validators.required],
        });
    }
}
