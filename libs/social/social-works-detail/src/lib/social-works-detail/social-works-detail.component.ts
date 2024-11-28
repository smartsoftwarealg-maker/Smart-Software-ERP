import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    SOCIAL_WORKS_TYPE, SocialActivity,
    SocialActivityService,
    SocialAid,
    SocialEmployeeService,
    SocialWorksService
} from '@social/social-api';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { EmployeeService, PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { LoginService } from '@ss/common/api-common';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'ss-social-works-detail',
    standalone: true,
    imports: [CommonModule, CommonUiAutoCompleteModule, CommonUiDatepickerModule,  MatCard, MatCardContent, MatError, MatFormField, MatLabel, ReactiveFormsModule, MatInput],
    templateUrl: './social-works-detail.component.html',
    styleUrl: './social-works-detail.component.scss'
})
export class SocialWorksDetailComponent extends BaseEntityDetailComponent<SocialAid> {
    #employeeSrv  = inject(SocialEmployeeService);
    #activitySrv = inject(SocialActivityService);
    #loginSrv  = inject(LoginService);

    employeeLookup = new PersonAutocompleteClass(this.#employeeSrv);
    activityLookup = new DefaultAutoCompleteModel(this.#activitySrv);

    constructor(
        public override entitySrv: SocialWorksService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SOCIAL_WORKS');
        this.activityLookup.onObjectSelected = a => this.onActivity(a);
        this.employeeLookup.searchLength = 100;
    }

    public override setupForm(b: SocialAid): UntypedFormGroup {
        return this.formBuilder.group({
            id:               [b.id],
            centerId:         [{value: b.centerId || this.#loginSrv.appCtx.center, disabled: true}, Validators.required],
            aidType:          [b.aidType, Validators.required],
            date:             [b.date || new Date(), Validators.required],
            number:           [{ value: b.number, disabled: true }, Validators.required],
            personId:         [b.personId, Validators.required],
            amount:           [{ value: b.amount, disabled: true }, Validators.required],
            medicalAidType:   [b.medicalAidType],
            installmentCount: [b.installmentCount],
            description:      [b.description],
            parentId:         [b.parentId || SOCIAL_WORKS_TYPE]
        });
    }

    private onActivity(a: SocialActivity) {
        const amount = this.form.controls['amount'];
        amount.setValue(a.value||0);
        if (a.value) {
            amount.disable({onlySelf: true});
        } else {
            amount.enable({onlySelf: true});
        }
    }

}
