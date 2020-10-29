import { Component } from '@angular/core';
import { StoreName, StoreNameService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";


@Component({
    selector: 'ss-store-name-list',
    templateUrl: '../base-templates/list-template.html',
    styleUrls: ['../base-templates/list-template.scss']
})
export class StoreNameListComponent extends BaseEntityListComponent<StoreName> {

    displayedColumns = ['description'];

    constructor(
        public storeNameSrv: StoreNameService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(storeNameSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'STOCK_STORE_NAMES');
    }

}
