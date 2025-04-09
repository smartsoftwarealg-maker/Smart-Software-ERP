import { Component, inject } from '@angular/core';
import { SSignature } from '../attendance-api';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { EmployeeService, PersonAutocompleteClass, } from '@ss/employee-services/employee-services';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { TranslateDirective } from '@ss/common/ui-lang';
import { HolidayTypeService } from '../holiday-type.service';
import { SerialAttendanceService } from '../serial-attendance.service';

@Component({
    selector: 'ss-serial-attendance-detail',
    templateUrl: './serial-attendance.component.html',
    styleUrls: ['./serial-attendance.component.scss'],
    imports: [
        MaterialModule,
        MatCard,
        MatCardContent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        DatePickerComponent,
        MatError,
        TranslateDirective,
        UiAutoCompleteComponent,
    ],
    standalone: true,
})
export class SerialAttendanceComponent extends BaseEntityDetailComponent<SSignature> {
    #employeeSrv = inject(EmployeeService);
    #absenceTypeSrv = inject(HolidayTypeService);

    absenceTypeLookup = new DefaultAutoCompleteModel(this.#absenceTypeSrv);
    employeeLookup: PersonAutocompleteClass = new PersonAutocompleteClass(
        this.#employeeSrv,
    );

    httpSrv = inject(HttpService);

    constructor(
        public override entitySrv: SerialAttendanceService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ATT_SERIAL_ATTENDANCE',
        );
    }

    public override setupForm(e: SSignature): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            from: [e.from, Validators.required],
            attendanceType: [e.attendanceType, Validators.required],
            dayCount: [e.dayCount, Validators.required],
        });
    }

    override save() {
        this.form.markAllAsTouched();
        if (!this.isValidForm()) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        if (this.saveButton.disabled) {
            return;
        }
        this.saveButton.disabled = true;
        const val = this.readForm();
        this.shellSrv.setLoading(true);
        const obs = this.entitySrv.add(val)
        obs.subscribe({
            next: () => {
                this.shellSrv.setLoading(false);
                this.goBack();
                this.form.markAsUntouched();
                this.snackBarSrv.showSuccessMessage();
            },
            error: err => {
                this.snackBarSrv.showFailureMessage();
                this.shellSrv.setLoading(false);
                this.saveButton.disabled = false;
                throw err;
            }
        });
    }
}
