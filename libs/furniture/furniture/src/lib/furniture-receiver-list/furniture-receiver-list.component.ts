import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {FurnitureReceiver} from '../furniture-api';
import {FurnitureReceiverService} from '../furniture-receiver.service';

@Component({
    selector: 'ss-furniture-receiver-list',
    templateUrl: './furniture-receiver-list.component.html',
    styleUrls: ['./furniture-receiver-list.component.scss'],
})
export class FurnitureReceiverListComponent extends BaseEntityListComponent<FurnitureReceiver> {

    displayedColumns = [
        'description',
    ];

    constructor(
        public override entitySrv: FurnitureReceiverService,
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
            'ASSET_RECEIVERS');
        this.pagination.pageSize = 15;
    }
}
