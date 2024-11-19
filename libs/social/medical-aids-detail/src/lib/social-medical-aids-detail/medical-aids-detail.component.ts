import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    MEDICAL_AIDS_TYPE, MedicalAid,
    MedicalAidTypesService,
    SocialAid, SocialEmployeeService
} from '@social/social-api';
import { PersonAutocompleteClass } from '@ss/employee-services/employee-services';
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
import { MedicalAidService } from '@social/social-api';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AidHistoryComponent } from '@social/aid-history';
import { PersonAidHistoryService } from '@social/social-api';

@Component({
    selector: 'ss-medical-aids-detail',
    standalone: true,
    imports: [CommonModule, CommonUiAutoCompleteModule, CommonUiDatepickerModule, CommonUiLangModule, MatCard, MatCardContent, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule, AidHistoryComponent],
    templateUrl: './medical-aids-detail.component.html',
    styleUrl: './medical-aids-detail.component.scss',
})
export class MedicalAidsDetailComponent extends BaseEntityDetailComponent<SocialAid> {
    #medicalAidTypeSrv = inject(MedicalAidTypesService);
    #employeeSrv  = inject(SocialEmployeeService);
    #loginSrv  = inject(LoginService);
    #personAidHistorySrv = inject(PersonAidHistoryService);

    employeeLookup = new PersonAutocompleteClass(this.#employeeSrv);
    medicalAidTypeLookup = new DefaultAutoCompleteModel(this.#medicalAidTypeSrv);
    // activityLookup = new DefaultAutoCompleteModel(this.activitySrv);

    constructor(
        public override entitySrv: MedicalAidService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SOCIAL_MEDICAL_AIDS');
        this.medicalAidTypeLookup.onObjectSelected = t => this.onMedicalTypeChange(t);
        this.employeeLookup.onObjectSelected = e => this.#personAidHistorySrv.setParentId(e.id||0);
        this.employeeLookup.searchLength = 100;
    }

    public override setupForm(b: SocialAid): UntypedFormGroup {
        this.#personAidHistorySrv.setParentId(b.personId||0);
        const form = this.formBuilder.group({
            id:               [b.id],
            centerId:         [{value: b.centerId || this.#loginSrv.appCtx.center, disabled: true}, Validators.required],
            aidType:          [b.aidType||0],
            date:             [b.date || new Date(), Validators.required],
            number:           [{ value: b.number||0, disabled: true }],
            personId:         [b.personId, Validators.required],
            amount:           [{ value: b.amount, disabled: true }, Validators.required],
            medicalAidType:   [b.medicalAidType, Validators.required],
            installmentCount: [b.installmentCount],
            description:      [b.description],
            referenceAmount:  [b.referenceAmount||0, Validators.required],
            parentId:         [b.parentId || MEDICAL_AIDS_TYPE],
            rate:             [b.amount > 0? 100.0 * b.amount / b.referenceAmount : 0, [Validators.min(5), Validators.max(100)]]
        });
        this.subscriptions.push(
            form.controls['rate']
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                ).subscribe(res => {
                    if (res) {
                        const refAmount = this.form.controls['referenceAmount']?.value || 0;
                        this.form.controls['amount'].setValue(refAmount * res / 100.0);
                    }
                }));
        this.subscriptions.push(
            form.controls['referenceAmount']
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                ).subscribe(res => {
                    if (res) {
                        const rate = this.form.controls['rate']?.value || 0;
                        this.form.controls['amount'].setValue(rate * res / 100.0);
                    }
                }));

        return form;
    }

    override readForm(): SocialAid {
        const value = this.form.getRawValue();
        delete value.rate;
        return value;
    }

    private onMedicalTypeChange(a: MedicalAid) {
        const amount = this.form.controls['rate'];
        amount.setValue(a.value||0);
        if (a.value) {
            amount.disable({onlySelf: true});
        } else {
            amount.enable({onlySelf: true});
        }
    }
}

