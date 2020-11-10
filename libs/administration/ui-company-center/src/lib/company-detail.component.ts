import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {LookupsService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {UserService} from "@ss/common/api-common";
import {Company, CompanyService} from "@ss/administration/api-company";


@Component({
    selector: 'ss-company-detail',
    styleUrls: ['./company-detail.component.scss'],
    templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent extends BaseEntityDetailComponent<Company> {


    constructor(
        public companyService: CompanyService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public centerService: UserService,
        public lookupsSrv: LookupsService) {
        super(companyService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_COMPANY');
    }


    public setupForm(b: Company) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            description: [b.description, Validators.required],
        });
    }

}
