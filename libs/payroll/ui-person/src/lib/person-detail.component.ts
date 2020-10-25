import {Component} from "@angular/core";
import {Person, PersonService} from "@ss/payroll/api-person";
import {PayrollLookupsService} from "@ss/payroll/api-lookup";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {BaseEntityDetailComponent} from "@ss/common/api-base-entity";
import {ImageModel} from "@ss/common/ui-image-input";
import {HttpService} from "@ss/common/api-common";
import {LanguageService} from "@ss/common/ui-lang";

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
        public payrollLookupsSrv: PayrollLookupsService) {
        super(personSrv, shellSrv, snackBarSrv, route, formBuilder, 'PAYROLL_EDIT_EMPLOYEE');
        this.imageModel = new ImageModel(this.httpSrv);
    }

    public setupForm(a: Person) {
        this.imageModel.setImageUrl(this.personSrv.getPhotoUrl(this.id), false);
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({});
    }

}
