import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {AssetBuilding} from '../assets-api';
import {AssetsBuildingService} from '../assets-building.service';

@Component({
  selector: 'ss-asset-building-list',
  templateUrl: './asset-building-list.component.html',
  styleUrls: ['./asset-building-list.component.scss']
})
export class AssetBuildingListComponent extends BaseEntityListComponent<AssetBuilding> {
    displayedColumns = [
        'location',
        'code',
        'description',
    ];

    constructor(
        public override entitySrv: AssetsBuildingService,
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
            'ASSET_BUILDINGS');
    }
}
