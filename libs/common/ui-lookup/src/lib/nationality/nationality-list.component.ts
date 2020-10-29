import { Component } from '@angular/core';
import { Nationality, NationalityService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";


@Component({
    selector: 'ss-nationality-list',
    templateUrl: '../base-templates/list-template.html',
    styleUrls: ['../base-templates/list-template.scss']
})
export class NationalityListComponent extends BaseEntityListComponent<Nationality> {

    displayedColumns = ['description'];

    constructor(
        public nationalitySrv: NationalityService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(nationalitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'PAYROLL_NATIONALITIES');
    }

}
