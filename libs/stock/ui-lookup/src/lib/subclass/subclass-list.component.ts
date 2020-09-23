import { Component } from '@angular/core';
import { Subclass, SubclassService } from '@ss/stock/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';


@Component({
    selector: 'ss-subclass-list',
    styleUrls: ['./subclass-list.component.scss'],
    templateUrl: './subclass-list.component.html'
})
export class SubclassListComponent extends BaseEntityListComponent<Subclass> {

    displayedColumns = ['description'];

    constructor(
        public subclassSrv: SubclassService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router) {
        super(subclassSrv, shellSrv, snackBarSrv, route, router, 'STOCK_SUBCLASSES');
    }

}
