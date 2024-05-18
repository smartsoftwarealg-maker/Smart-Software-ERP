import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { MEDICAL_AIDS_TYPE, SocialActivityService, SocialAid, SocialWorksService } from '@social/social-api';
import { EmployeeService, PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { LoginService } from '@ss/common/api-common';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MedicalAidService } from '../../../../social-api/src/lib/services/medical-aid.service';

@Component({
    selector: 'ss-medical-aids-detail',
    standalone: true,
    imports: [CommonModule, CommonUiAutoCompleteModule, CommonUiDatepickerModule, CommonUiLangModule, MatCard, MatCardContent, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
    templateUrl: './medical-aids-detail.component.html',
    styleUrl: './medical-aids-detail.component.scss',
})
export class MedicalAidsDetailComponent extends BaseEntityDetailComponent<SocialAid> {
    private employeeSrv  = inject(EmployeeService);
    private activitySrv = inject(SocialActivityService);
    private loginSrv  = inject(LoginService);

    employeeLookup = new PersonAutocompleteClass(this.employeeSrv);
    activityLookup = new DefaultAutoCompleteModel(this.activitySrv);

    constructor(
        public override entitySrv: MedicalAidService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SOCIAL_MEDICAL_AIDS');
    }

    public override setupForm(b: SocialAid): UntypedFormGroup {
        return this.formBuilder.group({
            id:               [b.id],
            centerId:         [{value: b.centerId || this.loginSrv.appCtx.center, disabled: true}, Validators.required],
            aidType:          [b.aidType, Validators.required],
            date:             [b.date || new Date(), Validators.required],
            number:           [{ value: b.number, disabled: true }, Validators.required],
            personId:         [b.personId, Validators.required],
            amount:           [b.amount, Validators.required],
            medicalAidType:   [b.medicalAidType],
            installmentCount: [b.installmentCount],
            description:      [b.description],
            parentId:         [b.parentId || MEDICAL_AIDS_TYPE]
        });
    }
}

