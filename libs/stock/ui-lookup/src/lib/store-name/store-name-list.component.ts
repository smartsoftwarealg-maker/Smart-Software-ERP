import { Component } from '@angular/core';
import { StoreName, StoreNameService } from '@ss/stock/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';


@Component({
    selector: 'ss-store-name-list',
    styleUrls: ['./store-name-list.component.scss'],
    templateUrl: './store-name-list.component.html'
})
export class StoreNameListComponent extends BaseEntityListComponent<StoreName> {

    displayedColumns = ['description'];

    constructor(
        public storeNameSrv: StoreNameService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router) {
        super(storeNameSrv, shellSrv, snackBarSrv, route, router, 'STOCK_STORE_NAMES');
    }

}
