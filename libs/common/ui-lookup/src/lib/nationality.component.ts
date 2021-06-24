import { Component } from '@angular/core';
import { Nationality, NationalityService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/api-base-entity';


@Component({
    selector: 'ss-nationality-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class NationalityListComponent extends BaseEntityListComponent<Nationality> {

    displayedColumns = ['description'];

    constructor(
        public nationalitySrv: NationalityService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router) {
        super(nationalitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'COMMON_NATIONALITIES');
    }

}


@Component({
    selector: 'ss-nationality-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class NationalityDetailComponent extends BaseEntityDetailComponent<Nationality> {

    constructor(
        public nationalitySrv: NationalityService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(nationalitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'EDIT_NATIONALITY');
    }

    public setupForm(e: Nationality): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
