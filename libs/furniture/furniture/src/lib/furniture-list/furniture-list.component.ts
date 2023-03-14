import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Furniture} from '../furniture-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {FurnitureService} from '../furniture.service';

@Component({
    selector: 'ss-furniture-list',
    templateUrl: './furniture-list.component.html',
    styleUrls: ['./furniture-list.component.scss'],
})
export class FurnitureListComponent  extends BaseEntityListComponent<Furniture> {

    displayedColumns = [
        'reference',
        'description',
        'acquisitionDate',
        'acquisitionValue',
        'accountNo'
    ];

    constructor(
        public override entitySrv: FurnitureService,
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
            'ASSET_FURNITURE');
        this.pagination.pageSize = 15;
    }
}
