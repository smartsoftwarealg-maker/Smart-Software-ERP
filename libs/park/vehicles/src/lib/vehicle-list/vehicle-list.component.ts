import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupsService } from '@ss/common/api-lookup';
import { HttpService, LanguageService, PaginatorPersistenceService } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { Vehicle } from '../vehicle-api';
import { VehicleService } from '../services/vehicle.service';

@Component({
    selector: 'ss-vehicle-list',
    standalone: true,
    imports: [
        CommonModule,

        CommonUiLangModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        UiPaginationModule],
    templateUrl: './vehicle-list.component.html',
    styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent extends BaseEntityListComponent<Vehicle> {
    public displayedColumns = [
        'description',
        'plateNumber',
        'typeDescription',
        'acquisitionDate'
    ];

    constructor(
        public driverSrv: VehicleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(driverSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'PARK_VEHICLES');
        this.pagination.pageSize = 15;
    }
}
