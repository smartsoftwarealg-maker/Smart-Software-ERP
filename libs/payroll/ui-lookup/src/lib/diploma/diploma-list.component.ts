import { Component } from '@angular/core';
import { Diploma, DiplomaService } from '@ss/payroll/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';


@Component({
    selector: 'ss-diploma-list',
    styleUrls: ['./diploma-list.component.scss'],
    templateUrl: './diploma-list.component.html'
})
export class DiplomaListComponent extends BaseEntityListComponent<Diploma> {

    displayedColumns = ['description'];

    constructor(
        public diplomaSrv: DiplomaService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router) {
        super(diplomaSrv, shellSrv, snackBarSrv, route, router, 'PAYROLL_DIPLOMAS');
    }

}
