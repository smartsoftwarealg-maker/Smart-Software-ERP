import {Component} from "@angular/core";
import {Person, PersonService} from "@ss/payroll/api-person";
import {PayrollLookupsService} from "@ss/payroll/api-lookup";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {BaseEntityDetailComponent} from "@ss/common/api-base-entity";

@Component({
    selector: 'ss-person-detail',
    styleUrls: ['./person-detail.component.scss'],
    templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent extends BaseEntityDetailComponent<Person> {

    constructor(
        public personSrv: PersonService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public payrollLookupsSrv: PayrollLookupsService) {
        super(personSrv, shellSrv, snackBarSrv, route, formBuilder, 'PAYROLL_EDIT_EMPLOYEE');
    }

    public setupForm(a: Person) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({});
    }
}
