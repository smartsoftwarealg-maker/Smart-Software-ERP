import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {FurnitureTransaction} from '../furniture-api';
import {FurnitureAssignmentsService} from '../furniture-assignments.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {FurnitureSalesService} from '../furniture-sales.service';

@Component({
    selector: 'ss-furniture-sales-list',
    templateUrl: './furniture-sales-list.component.html',
    styleUrls: ['./furniture-sales-list.component.scss'],
})
export class FurnitureSalesListComponent extends BaseEntityListComponent<FurnitureTransaction> {

    displayedColumns = [
        'number',
        'date',
        'supplierDescription'
    ];

    constructor(
        public override entitySrv: FurnitureSalesService,
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
            'COMMON_SALES');
        this.pagination.pageSize = 15;
    }
}
