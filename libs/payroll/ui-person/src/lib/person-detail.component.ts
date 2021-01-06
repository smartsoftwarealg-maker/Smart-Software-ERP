import {Component} from '@angular/core';
import {Person, PersonService} from '@ss/payroll/api-person';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {ImageModel} from '@ss/common/ui-image-input';
import {HttpService} from '@ss/common/api-common';
import {LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import { MatExpansionPanel } from '@angular/material/expansion';

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
            firstName: [p.firstName, Validators.compose([Validators.required, Validators.maxLength(64)])],
            lastName: [p.lastName, Validators.compose([Validators.required, Validators.maxLength(64)])],
            sex: p.sex,
            birthDate: [p.birthDate, Validators.required],
            birthPlace: p.birthPlace,
            father: p.father,
            mother: p.mother,
            address: p.address,
            wilaya: p.wilaya
        });
    }

    public isBirthInfoValid(): boolean {
        return true;
    }

    public isSecondaryInfoInvalid(): boolean {
        return false;
    }

    public isSectionInvalid(section: string): boolean {
        switch (section) {
            case 'birthInfo':
                return this.isBirthInfoValid();
            case 'secondaryInfo':
                return this.isSecondaryInfoInvalid();
            default:
                return false;
        }
    }

    public getPanelHeaderClass(section, panel: MatExpansionPanel): string {
        // if invalid return warning class
        if (this.isSectionInvalid(section)) {
            return "b-warn-expansion-panel";
        }

        // if expanded return primary background class
        if (panel.expanded)
            return 'b-primary-expansion-panel'
        else
            return '';
    }

    public readForm(): Person {
        return this.form.value;
    }
}
