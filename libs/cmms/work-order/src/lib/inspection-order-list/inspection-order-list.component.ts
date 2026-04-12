import { Component, OnInit } from "@angular/core";
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Work, WORK_TYPES } from '@ss/cmms/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CMMSInspectionOrderService } from '../services/c-m-m-s-inspection-order.service';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { Observable, tap } from 'rxjs';

@Component({
    selector: 'ss-inspection-list',
    templateUrl: './inspection-order-list.component.html',
    styleUrls: ['./inspection-order-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MaterialModule,
        PaginationComponent,
        TranslateDirective
    ]
})
export class InspectionOrderListComponent extends BaseEntityListComponent<Work> implements OnInit {
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
    ];

    constructor(
        public override entitySrv: CMMSInspectionOrderService,
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
            'CMMS_INSPECTION_ORDERS');
        this.pagination.pageSize = 15;
    }

    protected override preInit(): Observable<unknown> {
        return super.preInit()
            .pipe(tap(() => {
                const notInspection = !this.route
                    .snapshot
                    .data['inspection'];
                this.addButton.visible = notInspection;
                this.deleteButton.visible = notInspection;
            }));
    }


}
