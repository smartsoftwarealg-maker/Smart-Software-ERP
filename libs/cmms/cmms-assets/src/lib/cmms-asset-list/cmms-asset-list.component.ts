import { Component } from '@angular/core';

import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Asset } from '../services/asset-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { CmmsAssetService } from '../services/cmms-asset.service';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';


@Component({
    imports: [
    MatSortModule,
    MatTableModule,
    PaginationComponent,
    TranslateDirective
],
    selector: 'ss-cmms-asset-list',
    standalone: true,
    styleUrls: ['./cmms-asset-list.component.css'],
    templateUrl: './cmms-asset-list.component.html'
})
export class CmmsAssetListComponent extends BaseEntityListComponent<Asset> {
    displayedColumns = [
        'reference',
        'description',
        'serial_no',
        'className',
        'site',
        'building',
        'officeDescription',
        'statusDescription',
        'functionDescription'
    ];

    constructor(
        public override entitySrv: CmmsAssetService,
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
            'COMMON_ASSETS');
    }
}
