import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Fault } from '../gica-careers-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MotiveService } from '../services/motive.service';
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
import { FaultService } from '../services/fault.service';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { EmployeeService, PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-gica-fault-detail',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, UiPaginationModule, MatCard, MatCardContent, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule, CommonUiAutoCompleteModule, CommonUiDatepickerModule],
    templateUrl: './fault-detail.component.html',
    styleUrl: './fault-detail.component.css'
})
export class FaultDetailComponent extends BaseEntityDetailComponent<Fault> {
    private motiveSrv = inject(MotiveService);
    private employeeSrv = inject(EmployeeService);

    employeeLookup: PersonAutocompleteClass = new PersonAutocompleteClass(this.employeeSrv);
    motiveLookup = new DefaultAutoCompleteModel(this.motiveSrv);

    constructor(
        public override entitySrv: FaultService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_CAREER_FAULTS');
    }
    public override setupForm(b: Fault): UntypedFormGroup {
        return this.formBuilder.group({
            id:       [b.id],
            parentId: [{ value: b.parentId || this.entitySrv.getParentId(), disabled: true }, Validators.required],
            date:     [b.date, Validators.required],
            count:    [b.count, [Validators.required, Validators.min(1)]],
            motive:   [b.motive, Validators.required],
        });
    }
}
