import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {FurnitureReceiver, FurnitureTransaction} from '../furniture-api';
import {FurnitureReceiverService} from '../furniture-receiver.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {FurnitureAssignmentsService} from '../furniture-assignments.service';
import {FurnitureReceptionService} from '../furniture-reception.service';

@Component({
    selector: 'ss-furniture-reception-list',
    templateUrl: './furniture-reception-list.component.html',
    styleUrls: ['./furniture-reception-list.component.scss'],
})
export class FurnitureReceptionListComponent extends BaseEntityListComponent<FurnitureTransaction> {

    displayedColumns = [
        'number',
        'date',
        'supplierDescription'
    ];

    constructor(
        public override entitySrv: FurnitureReceptionService,
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
            'ASSET_RECEPTIONS');
        this.pagination.pageSize = 15;
    }
}
