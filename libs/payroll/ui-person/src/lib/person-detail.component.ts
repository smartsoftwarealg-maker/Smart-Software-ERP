import {Component} from '@angular/core';
import {Person, PersonService} from '@ss/payroll/api-person';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {ImageModel} from '@ss/common/ui-image-input';
import {HttpService} from '@ss/common/api-common';
import {LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";

@Component({
    selector: 'ss-person-detail',
    styleUrls: ['./person-detail.component.scss'],
    templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent extends BaseEntityDetailComponent<Person> {

    imageModel: ImageModel;

    constructor(
        public personSrv: PersonService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        public lookupSrv: LookupsService) {
        super(personSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_EDIT_EMPLOYEE');
        this.imageModel = new ImageModel(this.httpSrv);
    }

    public setupForm(p: Person) {
        this.imageModel.setImageUrl(this.personSrv.getPhotoUrl(this.id), false);
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: p.id,
            firstName: p.birthInfo.firstName,
            lastName: p.birthInfo.lastName,
            sex: p.birthInfo.sex,
            birthDate: p.birthInfo.birthDate,
            birthPlace: p.birthInfo.birthPlace,
            father: p.birthInfo.father,
            mother: p.birthInfo.mother,
            address: p.address.address,
            wilaya: p.address.wilaya,

        });
    }

    public readForm(): Person {
        return this.form.value;
    }
}
