import { Component } from '@angular/core';
import { Person, PersonService } from '@ss/payroll/api-person';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { BaseEntityDetailComponent } from '@ss/common/api-base-entity';
import { ImageModel } from '@ss/common/ui-image-input';
import { HttpService } from '@ss/common/api-common';
import { LookupsService, MaritalStatus, Nationality, NationalityService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MatExpansionPanel } from '@angular/material/expansion';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'ss-person-detail',
    styleUrls: ['./person-detail.component.scss'],
    templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent extends BaseEntityDetailComponent<Person> {

    imageModel: ImageModel;
    nationalityModel: DefaultAutoCompleteModel<Nationality>;
    maritalStatuses: MaritalStatus[];

    constructor(
        public personSrv: PersonService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(personSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_EDIT_EMPLOYEE');
        this.imageModel = new ImageModel(this.httpSrv);
        this.nationalityModel = new DefaultAutoCompleteModel<Nationality>(new NationalityService(httpSrv))
    }

    public preload(): Observable<any> {
        return this.lookupsSrv.getMaritalStatuses()
            .pipe(
                tap(x => this.maritalStatuses = x),
            );
    }

    public setupForm(p: Person) {
        this.imageModel.setImageUrl(this.personSrv.getPhotoUrl(this.id), false);
        // Make sure to update the template if you edit the configuration here
        if (!p.id) {
            p.sex = 1;
        }
        return this.formBuilder.group({
            // birth info
            id: p.id,
            firstName: [p.firstName, Validators.compose([Validators.required, Validators.maxLength(64)])],
            lastName: [p.lastName, Validators.compose([Validators.required, Validators.maxLength(64)])],
            sex: [p.sex, Validators.required],
            birthDate: [p.birthDate, Validators.required],
            birthPlace: [p.birthPlace, Validators.compose([Validators.required, Validators.maxLength(64)])],
            father: [p.father, Validators.maxLength(64)],
            mother: [p.mother, Validators.maxLength(64)],
            nationality: [p.nationality, Validators.required],
            // social info
            address1: [p.address1, Validators.maxLength(128)],
            email: [p.email, Validators.maxLength(64)],
            phone: [p.phone, Validators.maxLength(32)],
            mobile: [p.mobile, Validators.maxLength(32)],
            ss_Number: [p.ss_Number, Validators.compose([Validators.required, Validators.maxLength(32)])],
            maritalStatus: p.maritalStatus,
            // arabic info
            firstNameAr: [p.firstNameAr, Validators.maxLength(64)],
            lastNameAr: [p.lastNameAr, Validators.maxLength(64)],
            birthPlaceAr: [p.birthPlaceAr, Validators.maxLength(64)],
            fatherAr: [p.fatherAr, Validators.maxLength(64)],
            motherAr: [p.motherAr, Validators.maxLength(64)]
        });
    }

    public isControlValid(c: AbstractControl): boolean {
        return !c.touched || c.valid;
    }

    public isBirthInfoValid(): boolean {
        return this.isControlValid(this.form.controls.firstName) &&
            this.isControlValid(this.form.controls.lastName) &&
            this.isControlValid(this.form.controls.sex) &&
            this.isControlValid(this.form.controls.birthDate) &&
            this.isControlValid(this.form.controls.birthPlace) &&
            this.isControlValid(this.form.controls.father) &&
            this.isControlValid(this.form.controls.mother) &&
            this.isControlValid(this.form.controls.nationality);
    }

    public isSocialInfoPanelValid(): boolean {
        return this.isControlValid(this.form.controls.address1) &&
            this.isControlValid(this.form.controls.email) &&
            this.isControlValid(this.form.controls.phone) &&
            this.isControlValid(this.form.controls.mobile) &&
            this.isControlValid(this.form.controls.ss_Number) &&
            this.isControlValid(this.form.controls.maritalStatus);
    }

    public isArabicInfoPanelValid(): boolean {
        return this.isControlValid(this.form.controls.firstNameAr) &&
        this.isControlValid(this.form.controls.lastNameAr) &&
        this.isControlValid(this.form.controls.birthPlaceAr) &&
        this.isControlValid(this.form.controls.fatherAr) &&
        this.isControlValid(this.form.controls.motherAr);
    }

    public isSectionValid(section: string): boolean {
        switch (section) {
            case 'birthinfo':
                return this.isBirthInfoValid();
            case 'socialInfo':
                return this.isSocialInfoPanelValid();
            case 'arabicInfo':
                return this.isArabicInfoPanelValid();
            default:
                throw new Error('Unknown section ' + section)
        }
    }

    public getPanelHeaderClass(section, panel: MatExpansionPanel): string {
        // if invalid return warning class
        if (!this.isSectionValid(section)) {
            return "b-warn-expansion-panel";
        }

        // if expanded return primary background class
        if (panel.expanded)
            return 'b-primary-expansion-panel';
        else
            return '';
    }

    public readForm(): Person {
        return this.form.value;
    }

    uploadAttachements(id: number): Observable<any> {
        this.imageModel.setBackendUrl(this.personSrv.getPhotoUrl(id));
        return this.imageModel.submit('file');
    }

}
