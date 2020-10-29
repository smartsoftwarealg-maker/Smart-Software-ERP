import {Component} from '@angular/core';
import {MaritalStatus, MaritalStatusService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";


@Component({
    selector: 'ss-marital-status-list',
    templateUrl: '../base-templates/list-template.html',
    styleUrls: ['../base-templates/list-template.scss']
})
export class MaritalStatusListComponent extends BaseEntityListComponent<MaritalStatus> {

    displayedColumns = ['description'];

    constructor(
        public maritalStatusSrv: MaritalStatusService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(maritalStatusSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'PAYROLL_MARITAL_STATUS');
    }

}
