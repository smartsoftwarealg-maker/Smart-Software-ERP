import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Lookup} from '@ss/common/api-lookup';
import {AssetBlockingTypeService} from '../services/asset-blocking-type.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {AssetEndTypeService} from '../services/asset-end-type.service';

@Component({
  selector: 'ss-end-types-list',
  templateUrl: './end-types-list.component.html',
  styleUrls: ['./end-types-list.component.scss']
})
export class EndTypesListComponent  extends BaseEntityListComponent<Lookup> {
    displayedColumns = [
        'description',
        'descriptionAr',
    ]
    constructor(
        public infoSrv: AssetEndTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'ASSET_END_TYPES');
        this.pagination.pageSize = 15;
    }
}
