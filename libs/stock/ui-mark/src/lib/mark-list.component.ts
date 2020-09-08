import { Component } from '@angular/core';
import { Mark, MarkService } from '@ss/stock/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';


@Component({
    selector: 'ss-mark-list',
    styleUrls: ['./mark-list.component.scss'],
    templateUrl: './mark-list.component.html'
})
export class MarkListComponent extends BaseEntityListComponent<Mark> {

    displayedColumns = ['description'];

    constructor(
        public markSrv: MarkService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router) {
        super(markSrv, shellSrv, snackBarSrv, route, router, 'STOCK_MARKS');
    }

}