import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {Wilaya, WilayaService} from "@ss/common/api-lookup";


@Component({
    selector: 'ss-wilaya-list',
    templateUrl: '../base-templates/list-template.html',
    styleUrls: ['../base-templates/list-template.scss']
})
export class WilayaListComponent extends BaseEntityListComponent<Wilaya> {

    displayedColumns = ['description'];

    constructor(
        public wilayaSrv: WilayaService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router) {
        super(wilayaSrv, shellSrv, snackBarSrv, route, router, 'COMMON_WILAYAS');
    }

}
