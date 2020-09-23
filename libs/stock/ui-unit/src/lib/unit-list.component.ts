import { Component } from '@angular/core';
import { Unit, UnitService } from '@ss/stock/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';


@Component({
    selector: 'ss-unit-list',
    styleUrls: ['./unit-list.component.scss'],
    templateUrl: './unit-list.component.html'
})
export class UnitListComponent extends BaseEntityListComponent<Unit> {

    displayedColumns = ['description'];

    constructor(
        public unitSrv: UnitService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router) {
        super(unitSrv, shellSrv, snackBarSrv, route, router, 'STOCK_UNITS');
    }

}
