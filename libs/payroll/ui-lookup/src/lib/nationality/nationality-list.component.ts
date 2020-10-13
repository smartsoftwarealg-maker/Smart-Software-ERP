import { Component } from '@angular/core';
import { Nationality, NationalityService } from '@ss/payroll/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';


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
        public router: Router) {
        super(nationalitySrv, shellSrv, snackBarSrv, route, router, 'PAYROLL_NATIONALITIES');
    }

}
