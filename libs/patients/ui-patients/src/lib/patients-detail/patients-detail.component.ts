import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    Activity,
    AgentPrice,
    AgentType,
    City,
    CompanyType,
    Country,
    Currency,
    LookupsService,
    PayMode
} from '@ss/common/api-lookup';
import {Bank} from '@ss/administration/api-bank';
import {FormValidators, LoginService} from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { MatExpansionPanel, MatAccordion, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import {Patient, PatientService} from '@ss/patients/api-patient';
import { NgIf, NgFor } from '@angular/common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { Dir } from '@angular/cdk/bidi';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
    selector: 'ss-patients-detail',
    templateUrl: './patients-detail.component.html',
    styleUrls: ['./patients-detail.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, TranslateDirective, MatFormField, MatLabel, MatInput, MatError, DatePickerComponent, MatRadioGroup, MatRadioButton, Dir, MatSelect, MatOption, NgFor]
})
export class PatientsDetailComponent extends  BaseEntityDetailComponent<Patient> {
    pwd1 = new UntypedFormControl();
    pwd2 = new UntypedFormControl();
    agentTypes: AgentType[];
    companyTypes: CompanyType[] = [];
    cities: City[] = [];
    countries: Country[] = [];
    currencies: Currency[] = [];
    payModes: PayMode[] = [];
    activities: Activity[] = [];
    prices: AgentPrice[] = [];
    banks: Bank[] = [];


    constructor(
        private loginSrv: LoginService,
        public patientSrv: PatientService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(patientSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_PATIENTS');
    }

    public preload(): Observable<any> {
        return this.lookupsSrv
            .getAgentTypes()
            .pipe(
                tap(x => this.agentTypes = x),
                switchMap(() => this.lookupsSrv.getCities()),
                tap(x => this.cities = x),
                // switchMap(() => this.lookupsSrv.getCountries()),
                // tap(x => this.countries = x),
                // switchMap(() => this.lookupsSrv.getCompanyTypes()),
                // tap(x => this.companyTypes = x),
                // switchMap(() => this.lookupsSrv.getCurrencies()),
                // tap(x => this.currencies = x),
                // switchMap(() => this.lookupsSrv.getPayModes()),
                // tap(x => this.payModes = x),
                // switchMap(() => this.lookupsSrv.getActivities()),
                // tap(x => this.activities = x),
                // switchMap(() => this.lookupsSrv.getPrices()),
                // catchError(e => of([])),
                // tap(x => this.prices = x),
                // switchMap(() => this.lookupsSrv.getBanks()),
                // tap(x => this.banks = x)
            );
    }

    public override setupForm(a: Patient) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [a.id],
            patientId: [a.patientId],
            firstName: [a.firstName],
            lastName: [a.lastName],
            firstNameAr: [a.firstNameAr],
            lastNameAr: [a.lastNameAr],
            birthDate: [a.birthDate],
            birthPlace: [a.birthPlace],
            sex: [a.sex + ''],
            city: [a.city],
            address: [a.address],
            phone: [a.phone],
            ssNumber: [a.ssNumber],
            profession: [a.profession],
            maritalStatus: [a.maritalStatus],
            childCount: [a.childCount],
            isDAS: [a.isDAS],
            educationLevel: [a.educationLevel],
            workingSpouse: [a.workingSpouse],
            lodgingType: [a.lodgingType],
            spouseProfession: [a.spouseProfession],
            spouseLastName: [a.spouseLastName],
            spouseFirstName: [a.spouseFirstName],
            hasVehicle: [a.hasVehicle],
        });
    }

    public isTouchedAndInvalid(control: AbstractControl): boolean {
        return control && control.invalid && control.touched;
    }

    public isGeneralSectionInvalid(): boolean {
        return this.isTouchedAndInvalid(this.form.controls['lastName']) ||
            this.isTouchedAndInvalid(this.form.controls['firstName']) ||
            this.isTouchedAndInvalid(this.form.controls['birthPlace']) ||
            this.isTouchedAndInvalid(this.form.controls['birthDate'])
    }

    public isLatinSectionInvalid(): boolean {
        return this.isTouchedAndInvalid(this.form.controls['email']);
    }

    public isSectionInvalid(section: string): boolean {
        switch (section) {
            case 'general':
                return this.isGeneralSectionInvalid();
            case 'latin':
                return this.isLatinSectionInvalid();
            default:
                return false;
        }
    }

    public getPanelHeaderClass(section: string, panel: MatExpansionPanel): string {
        // if invalid return warning class
        if (this.isSectionInvalid(section)) {
            return 'b-warn-expansion-panel';
        }

        // if expanded return primary background class
        if (panel.expanded)
            return 'b-primary-expansion-panel'
        else
            return '';
    }

    override readForm(): Patient {
        const a = super.readForm();
        a.centerId = this.loginSrv.appCtx.center;
        a.sex = +this.form.controls['sex'].value;
        return a;
    }

    updatePassword() {
        if (this.pwd1.value === this.pwd2.value ) {
            this.patientSrv
                .updatePassword({id: this.loginSrv.appCtx.id, agentId: this.form.controls['id'].value, password: this.pwd2.value })
                .subscribe(res => this.snackBarSrv.showMessage('COMMON_SUCCESS', false, false));
        }
    }
}
