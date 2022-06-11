import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {AssetInventory} from '../assets-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService, PaginatorPersistenceService} from '@ss/common/api-common';
import {AssetInventoryService} from '../asset-inventory.service';
import {AccPoliciesService} from '@ss/accounting/accounting-api';
import {Observable, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'ss-asset-inventory-list',
  templateUrl: './asset-inventory-list.component.html',
  styleUrls: ['./asset-inventory-list.component.scss']
})
export class AssetInventoryListComponent extends BaseEntityListComponent<AssetInventory> {

    displayedColumns = [
        'officeDescription',
        'assetDescription',
        'date'
    ];

    constructor(
        public override entitySrv: AssetInventoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private loginSrv: LoginService,
        private policySrv: AccPoliciesService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'INVENTORY');
    }

    override preload(): Observable<any> {
        return this.loginSrv
            .loadContext()
            .pipe(switchMap(_ => this.policySrv.get(this.loginSrv.appCtx.center)),
                  tap(res => this.entitySrv.setParentId(res.inventoryYear)));
    }
}
