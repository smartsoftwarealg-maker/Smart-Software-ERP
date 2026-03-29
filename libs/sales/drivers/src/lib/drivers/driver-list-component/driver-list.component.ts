import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {SalesDriver} from '../driver-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {MaterialModule, PaginatorPersistenceService} from '@ss/common/api-common';
import {ReactiveFormsModule} from '@angular/forms';
import {PaginationComponent} from '@ss/common/ui-pagination';
import {TranslateDirective} from '@ss/common/ui-lang';
import { DatePipe } from '@angular/common';
import {DriverService} from '../driver.service';

@Component({
    selector: 'ss-sales-driver-list',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        PaginationComponent,
        TranslateDirective,
        DatePipe,
    ],
    styleUrls: ['./driver-list.component.scss'],
    templateUrl: './driver-list.component.html'
})
export class DriverListComponent extends BaseEntityListComponent<SalesDriver> {

    displayedColumns = [
        'description',
        'licenceNumber',
        'licenceDate',
        'issuedBy'
    ];

    constructor(
        public override entitySrv: DriverService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'LOGISTICS_DRIVERS',
        );
        this.pagination.pageSize = 15;
    }
}

