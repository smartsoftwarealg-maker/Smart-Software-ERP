import {Component, OnInit} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Asset} from '../assets-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {AssetsService} from '../assets.service';

@Component({
    selector: 'ss-assets-list',
    templateUrl: './assets-list.component.html',
    styleUrls: ['./assets-list.component.scss']
})
export class AssetsListComponent extends BaseEntityListComponent<Asset> {
    displayedColumns = [
        'reference',
        'description',
        'accountno',
        'acquisitionDate',
        'serviceDate',
        'acquisitionValue',
        'depreciationRate',
        'useful_life',
        'residualValue',
    ];

    constructor(public listSrv: AssetsService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override defReportSrv: DefaultReportService,
                public override confirmationSrv: ConfirmationDialogService,
                public override pagPersistSrv: PaginatorPersistenceService) {
        super(listSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv, pagPersistSrv,
            'COMMON_ASSETS');
    }
}
