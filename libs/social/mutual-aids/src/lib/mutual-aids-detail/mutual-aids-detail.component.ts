import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    MUTUAL_AIDS_TYPE,
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
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MutualAidService } from '../../../../social-api/src/lib/services/mutual-aid.service';

@Component({
    selector: 'ss-mutual-aids-detail',
    standalone: true,
    imports: [CommonModule, DatePickerComponent, MatCard, MatCardContent, MatError, MatFormField, MatLabel, ReactiveFormsModule, MatInput, UiAutoCompleteComponent],
    templateUrl: './mutual-aids-detail.component.html',
    styleUrl: './mutual-aids-detail.component.scss'
})
export class MutualAidsDetailComponent extends BaseEntityDetailComponent<SocialAid> {
    #employeeSrv  = inject(SocialEmployeeService);
    #activitySrv = inject(SocialActivityService);
    #loginSrv  = inject(LoginService);

    employeeLookup = new PersonAutocompleteClass(this.#employeeSrv);
    activityLookup = new DefaultAutoCompleteModel(this.#activitySrv);

    constructor(
        public override entitySrv: MutualAidService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SOCIAL_MUTUAL_AIDS');
        this.activityLookup.onObjectSelected = a => this.onActivity(a);
        this.employeeLookup.searchLength = 100;
    }

    public override setupForm(b: SocialAid): UntypedFormGroup {
        return this.formBuilder.group({
            id:               [b.id],
            centerId:         [{value: b.centerId || this.#loginSrv.appCtx.center, disabled: true}, Validators.required],
            aidType:          [b.aidType||0],
            date:             [b.date || new Date(), Validators.required],
            number:           [{ value: b.number, disabled: true }, Validators.required],
            personId:         [b.personId, Validators.required],
            amount:           [b.amount, Validators.required],
            medicalAidType:   [b.medicalAidType],
            installmentCount: [0],
            description:      [b.description],
            parentId:         [b.parentId || MUTUAL_AIDS_TYPE],
            referenceAmount:  [b.referenceAmount||0, Validators.required],
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
