import { Component, inject } from '@angular/core';
import { ATTSignature } from '../attendance-api';
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
import { SignatureService } from '../signature.service';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { AbsenceMotiveService } from '../absence-motive.service';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import {
    EmployeeService,
    PersonAutocompleteClass,
} from '@ss/employee-services/employee-services';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { TranslateDirective } from '@ss/common/ui-lang';
import { HolidayTypeService } from '../holiday-type.service';
import { switchMap, tap } from 'rxjs/operators';
import { of, zip } from 'rxjs';

@Component({
    selector: 'ss-attendance-log-detail',
    templateUrl: './attendance-log-detail.component.html',
    styleUrls: ['./attendance-log-detail.component.scss'],
    imports: [
        MaterialModule,
        MatCard,
        MatCardContent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        UiAutoCompleteComponent,
        DatePickerComponent,
        MatError,
        TranslateDirective,
    ],
    standalone: true,
})
export class AttendanceLogDetailComponent extends BaseEntityDetailComponent<ATTSignature> {
    #employeeSrv = inject(EmployeeService);
    #absenceTypeSrv = inject(HolidayTypeService);
    #loginSrv = inject(LoginService);

    absenceTypeLookup = new DefaultAutoCompleteModel(this.#absenceTypeSrv);
    employeeLookup: PersonAutocompleteClass = new PersonAutocompleteClass(
        this.#employeeSrv,
    );

    create = false;

    constructor(
        public override entitySrv: SignatureService,
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
            'ATT_MANUAL_SIGNATURE',
        );
    }

    public override setupForm(e: ATTSignature): UntypedFormGroup {
        if (!e.id) {
            this.create = true;
            return this.formBuilder.group({
                id: [e.id],
                personId: [e.personId, Validators.required],
                from: [e.dateTime, Validators.required],
                to: [e.dateTime, Validators.required],
                manually: [true],
                updater: [e.updater || this.#loginSrv.appCtx.id],
                attendanceType: [e.attendanceType],
            });
        } else {
            return this.formBuilder.group({
                id: [e.id],
                personId: [e.personId, Validators.required],
                dateTime: [e.dateTime, Validators.required],
                manually: [true],
                updater: [e.updater || this.#loginSrv.appCtx.id],
                attendanceType: [e.attendanceType],
                centerId: [e.centerId],
            });
        }
    }

    public override save() {
        if (!this.create) {
            super.save();
            return;
        }

        this.form.markAllAsTouched();
        if (!this.isValidForm()) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        if (this.saveButton.disabled) {
            return;
        }
        this.saveButton.disabled = true;
        const val = this.form.getRawValue();

        // val.id = this.queryId || val.id;
        this.shellSrv.setLoading(true);

        const val1: ATTSignature = {
            id: val.id,
            personId: val.personId,
            dateTime: val.from,
            manually: true,
            updater: this.#loginSrv.appCtx.id,
            attendanceType: val.attendanceType,
            centerId: this.#loginSrv.appCtx.center,
        };
        const val2: ATTSignature = {
            id: val.id,
            personId: val.personId,
            dateTime: val.to,
            manually: true,
            updater: this.#loginSrv.appCtx.id,
            attendanceType: val.attendanceType,
            centerId: this.#loginSrv.appCtx.center,
        };

        const obs1 = this.entitySrv.add2(val1);
        const obs2 = this.entitySrv.add2(val2);

        let obs = zip(obs1, val2.dateTime == null? of(0) : obs2);

        obs.subscribe({
            next: () => {
                this.shellSrv.setLoading(false);
                this.goBack();
                this.form.markAsUntouched();
                this.snackBarSrv.showSuccessMessage();
                // this.saveButton.disabled = false;
            },
            error: (err) => {
                this.snackBarSrv.showFailureMessage();
                this.shellSrv.setLoading(false);
                this.saveButton.disabled = false;
                throw err;
            },
        });
    }
}
