import {Component} from '@angular/core';
import {ServiceService, Service} from '@ss/payroll/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';


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
        public router: Router) {
        super(serviceSrv, shellSrv, snackBarSrv, route, router, 'PAYROLL_SERVICES');
    }

}
