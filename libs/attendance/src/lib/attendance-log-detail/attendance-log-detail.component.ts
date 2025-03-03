import { Component, inject } from '@angular/core';
import { ATTSignature } from '../attendance-api';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { SignatureService } from '../signature.service';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { AbsenceMotiveService } from '../absence-motive.service';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { EmployeeService, PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { TranslateDirective } from '@ss/common/ui-lang';
import { HolidayTypeService } from '../holiday-type.service';

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
        TranslateDirective
    ],
    standalone: true
})
export class AttendanceLogDetailComponent extends BaseEntityDetailComponent<ATTSignature> {
    #employeeSrv = inject(EmployeeService);
    #absenceTypeSrv = inject(HolidayTypeService);
    #loginSrv = inject(LoginService);

    absenceTypeLookup = new DefaultAutoCompleteModel(this.#absenceTypeSrv);
    employeeLookup: PersonAutocompleteClass = new PersonAutocompleteClass(this.#employeeSrv);

    constructor(
        public override entitySrv: SignatureService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ATT_MANUAL_SIGNATURE');
    }

    public override setupForm(e: ATTSignature): UntypedFormGroup {
        return this.formBuilder.group({
            id:             [e.id],
            personId:       [e.personId],
            dateTime:       [e.dateTime, Validators.required],
            manually:       [true],
            updater:        [e.updater || this.#loginSrv.appCtx.id],
            attendanceType: [e.attendanceType]
        })
    }

}
