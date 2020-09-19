import { Component } from '@angular/core';
import { Class, ClassService } from '@ss/stock/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';


@Component({
    selector: 'ss-class-list',
    styleUrls: ['./class-list.component.scss'],
    templateUrl: './class-list.component.html'
})
export class ClassListComponent extends BaseEntityListComponent<Class> {

    displayedColumns = ['description'];

    constructor(
        public classSrv: ClassService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router) {
        super(classSrv, shellSrv, snackBarSrv, route, router, 'STOCK_CLASSES');
    }

}
