import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {AssetLocation} from '../assets-api';
import {BankService} from '@ss/administration/api-bank';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {AssetLocationService} from '../asset-location.service';

@Component({
  selector: 'ss-asset-locations-list',
  templateUrl: './asset-locations-list.component.html',
  styleUrls: ['./asset-locations-list.component.scss']
})
export class AssetLocationsListComponent extends BaseEntityListComponent<AssetLocation> {
    displayedColumns = [
        'description',
        'code'
    ];

    constructor(
        public override entitySrv: AssetLocationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ASSET_LOCATIONS');
        this.pagination.pageSize = 10;
    }

}
