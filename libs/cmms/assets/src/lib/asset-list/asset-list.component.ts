import { Component } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Asset } from '@ss/assets-component';
import { AssetsService } from '@ss/assets-component';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { IsParamService, PaginatorPersistenceService } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'ss-asset-list',
    templateUrl: './asset-list.component.html',
    styleUrls: ['./asset-list.component.css'],
})
export class AssetListComponent extends BaseEntityListComponent<Asset> {
    displayedColumns = [
        'reference',
        'description',
        'accountno',
        'acquisitionDate',
        'serviceDate',
        'acquisitionValue',
        'serial_no',
        'officeDescription'
    ];
    constructor(public listSrv: AssetsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private dialog: MatDialog,
        private isParamSrv: IsParamService) {
        super(listSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ASSETS');
        this.pagination.pageSize = 10;
    }
}
