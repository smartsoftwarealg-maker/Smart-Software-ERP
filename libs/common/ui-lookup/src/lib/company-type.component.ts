import {Component} from '@angular/core';
import {CompanyType, CompanyTypeService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';


@Component({
    selector: 'ss-company-type-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class CompanyTypeListComponent extends BaseEntityListComponent<CompanyType> {

    displayedColumns = ['description'];

    constructor(
        public companyTypeSrv: CompanyTypeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router) {
        super(companyTypeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'COMMON_COMPANY_TYPES');
    }

}


@Component({
    selector: 'ss-company-type-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class CompanyTypeDetailComponent extends BaseEntityDetailComponent<CompanyType> {

    constructor(
        public companyTypeServ: CompanyTypeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(companyTypeServ, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_COMPANY_TYPE');
    }

    public setupForm(e: CompanyType): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
