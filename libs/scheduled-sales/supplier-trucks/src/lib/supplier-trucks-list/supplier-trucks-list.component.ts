import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {SupplierTruck, SupplierTruckService} from '@ss/scheduled-sales/api-scheduled-sales';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
    selector: 'ss-supplier-trucks-list',
    templateUrl: './supplier-trucks-list.component.html',
    styleUrls: ['./supplier-trucks-list.component.scss'],
})
export class SupplierTrucksListComponent extends BaseEntityListComponent<SupplierTruck> {

    displayedColumns = [
        'supplierCode',
        'supplierName',
        'plateNumber'
    ];

    constructor(
        public override entitySrv: SupplierTruckService,
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
            'SCH_SUPPLIER_TRUCKS');
        this.pagination.pageSize = 10;
    }}
