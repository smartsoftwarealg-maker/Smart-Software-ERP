import {Component} from '@angular/core';
import {ServiceService, Service} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";


@Component({
    selector: 'ss-service-list',
    templateUrl: '../base-templates/list-template.html',
    styleUrls: ['../base-templates/list-template.scss']
})
export class ServiceListComponent extends BaseEntityListComponent<Service> {

    displayedColumns = ['description'];

    constructor(
        public serviceSrv: ServiceService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(serviceSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'PAYROLL_SERVICES');
    }

}
