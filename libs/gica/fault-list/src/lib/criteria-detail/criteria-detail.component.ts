import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Criterion } from '../gica-careers-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CriterionService } from '../services/criterion.service';

@Component({
    selector: 'ss-gica-criteria-detail',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, UiPaginationModule, MatCard, MatCardContent, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule, CommonUiAutoCompleteModule, CommonUiDatepickerModule],
    templateUrl: './criteria-detail.component.html',
    styleUrl: './criteria-detail.component.css'
})
export class CriteriaDetailComponent extends BaseEntityDetailComponent<Criterion> {
    constructor(
        public override entitySrv: CriterionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_CAREER_CRITERIA');
    }
    public override setupForm(b: Criterion): UntypedFormGroup {
        return this.formBuilder.group({
            id:          [b.id],
            parentId:    [{ value: b.parentId || this.entitySrv.getParentId(), disabled: true }, Validators.required],
            description: [b.description, Validators.required],
            grade:       [b.grade || 4, [Validators.required, Validators.min(1)]],
            sign:        [b.sign || 1, Validators.required],
        });
    }
}
