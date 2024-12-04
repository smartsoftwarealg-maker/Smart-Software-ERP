import { Component } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Work, WORK_TYPES } from '@ss/cmms/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CMMSWorkOrderService } from '../services/c-m-m-s-work-order.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'ss-work-order-list',
    templateUrl: './work-order-list.component.html',
    styleUrls: ['./work-order-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        PaginationComponent,
        MatTableModule,

        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        DatePickerComponent,
        MatButtonModule,
        MaterialModule
    ],
})
export class WorkOrderListComponent extends BaseEntityListComponent<Work> {
    public types = WORK_TYPES;
    displayedColumns = [
        'number',
        'date',
        'description',
        'assetDescription',
        'requesterDescription',
        'typeDescription',
        'faultDescription',
        'statusDescription',
        // 'plannedStart',
        // 'plannedDue',
    ];

    constructor(
        public override entitySrv: CMMSWorkOrderService,
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
            'CMMS_WORK_ORDER');
        this.pagination.pageSize = 15;
    }
}
