import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
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
import {MatExpansionPanel} from '@angular/material/expansion';
import {Patient, PatientService} from '@ss/patients/api-patient';

@Component({
    selector: 'ss-patients-detail',
    templateUrl: './patients-detail.component.html',
    styleUrls: ['./patients-detail.component.scss']
})
export class PatientsDetailComponent extends  BaseEntityDetailComponent<Patient> {
    pwd1 = new FormControl();
    pwd2 = new FormControl();
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
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
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
                switchMap(() => this.lookupsSrv.getCountries()),
                tap(x => this.countries = x),
                switchMap(() => this.lookupsSrv.getCompanyTypes()),
                tap(x => this.companyTypes = x),
                switchMap(() => this.lookupsSrv.getCurrencies()),
                tap(x => this.currencies = x),
                switchMap(() => this.lookupsSrv.getPayModes()),
                tap(x => this.payModes = x),
                switchMap(() => this.lookupsSrv.getActivities()),
                tap(x => this.activities = x),
                switchMap(() => this.lookupsSrv.getPrices()),
                catchError(e => of([])),
                tap(x => this.prices = x),
                switchMap(() => this.lookupsSrv.getBanks()),
                tap(x => this.banks = x)
            );
    }


    finishLoading(e: Patient) {
        super.finishLoading(e);
        this.form.controls['recordBlocked']
            .valueChanges
            .subscribe(x => {
                if (x) {
                    this.form.controls['blockingReason'].disable();
                    this.form.controls['blockingReason'].setValue('');
                } else {
                    this.form.controls['blockingReason'].enable()
                }

            });
    }

    public setupForm(a: Patient) {

        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [a.id],
            firstName: [a.firstName],
            lastName: [a.lastName],
            birthDate: [a.birthDate],
            birthPlace: [a.birthPlace],
            firstNameAr: [a.firstNameAr],
            lastNameAr: [a.lastNameAr],
            address: [a.address],
            city: [a.city],
            country: [a.country],
            phone: [a.phone],
            mobile: [a.mobile],
            fax: [a.fax],
            currency: [a.currency],
            addressAr: [a.addressAr],
            agentType: [a.agentType],
            email: [a.email, Validators.email],
            recordBlocked: [a.recordBlocked],
            blockingReason: {value: a.blockingReason, disabled: a.recordBlocked},
            creationTime: {value: a.creationTime, disabled: true}
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

    readForm(): Patient {
        const a = super.readForm();
        a.agentType = a.agentType || 0;
        a.currency = a.currency || this.currencies[0].id;
        return a;
    }

    uploadAttachments(id: number): Observable<any> {
        return this.patientSrv
            .get(id)
            .pipe(tap(agent => {
                this.form.controls['currency'].setValue(agent.currency);
                this.form.controls['creationTime'].setValue(agent.creationTime);
            }));
    }

    updatePassword() {
        if (this.pwd1.value === this.pwd2.value ) {
            this.patientSrv
                .updatePassword({id: this.loginSrv.appCtx.id, agentId: this.form.controls['id'].value, password: this.pwd2.value })
                .subscribe(res => this.snackBarSrv.showMessage('COMMON_SUCCESS', false, false));
        }
    }
}
