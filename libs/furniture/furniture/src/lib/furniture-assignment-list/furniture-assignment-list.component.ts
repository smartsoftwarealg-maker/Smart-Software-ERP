import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {FurnitureTransaction} from '../furniture-api';
import {FurnitureReceptionService} from '../furniture-reception.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {FurnitureAssignmentsService} from '../furniture-assignments.service';

@Component({
    selector: 'ss-furniture-assignment-list',
    templateUrl: './furniture-assignment-list.component.html',
    styleUrls: ['./furniture-assignment-list.component.scss'],
})
export class FurnitureAssignmentListComponent extends BaseEntityListComponent<FurnitureTransaction> {

    displayedColumns = [
        'number',
        'date',
        'supplierDescription'
    ];

    constructor(
        public override entitySrv: FurnitureAssignmentsService,
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
            'ASSET_APPOINTMENTS');
        this.pagination.pageSize = 15;
    }
}
