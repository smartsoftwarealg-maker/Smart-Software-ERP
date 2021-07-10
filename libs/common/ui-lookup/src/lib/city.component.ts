import { Component } from '@angular/core';
import { City, CityService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DefaultReportService} from '@ss/common/ui-default-report-component';


@Component({
    selector: 'ss-city-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class CityListComponent extends BaseEntityListComponent<City> {

    displayedColumns = ['description'];

    constructor(
        public citySrv: CityService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router) {
        super(citySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'COMMON_CITIES');
    }

}


@Component({
    selector: 'ss-city-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class CityDetailComponent extends BaseEntityDetailComponent<City> {

    constructor(
        public citySrv: CityService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(citySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_CITY');
    }

    public setupForm(e: City): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
