import { Component } from '@angular/core';
import { Country, CountryService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
    selector: 'ss-country-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class CountryListComponent extends BaseEntityListComponent<Country> {

    displayedColumns = ['description'];

    constructor(
        public countrySrv: CountryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(countrySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'COMMON_COUNTRIES');
    }

}


@Component({
    selector: 'ss-country-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class CountryDetailComponent extends BaseEntityDetailComponent<Country> {

    constructor(
        public countrySrv: CountryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(countrySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_COUNTRY');
    }

    public setupForm(e: Country): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
