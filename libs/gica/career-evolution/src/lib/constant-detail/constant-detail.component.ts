import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Constant } from '../gica-careers-api';
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
import { ConstantService } from '../services/constant.service';
import { LoginService } from '@ss/common/api-common';
import { Observable } from 'rxjs';

@Component({
    selector: 'ss-gica-constant-detail',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, UiPaginationModule, MatCard, MatCardContent, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
    templateUrl: './constant-detail.component.html',
    styleUrl: './constant-detail.component.css'
})
export class ConstantDetailComponent extends BaseEntityDetailComponent<Constant> {
    private loginSrv = inject(LoginService);

    constructor(
        public override entitySrv: ConstantService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_CAREER_CONSTANTS');
    }
    public override setupForm(b: Constant): UntypedFormGroup {
        return this.formBuilder.group({
            id:           [b.id],
            centerId:     [b.centerId || this.loginSrv.appCtx.center],
            yearlyGrade:  [b.yearlyGrade, Validators.required],
            rate:         [b.rate, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
            maxRate:      [b.maxRate, [Validators.required, Validators.max(100), Validators.min(1)]],
            passingGrade: [b.passingGrade, [Validators.required, Validators.min(3), Validators.max(50)]],
        });
    }

    override loadEntity(id: number): Observable<Constant> {
        return super.loadEntity(this.loginSrv.appCtx.center);
    }
}
