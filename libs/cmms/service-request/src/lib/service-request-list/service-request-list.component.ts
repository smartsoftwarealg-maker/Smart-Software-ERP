import { Component, inject, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Work, WORK_TYPES } from '@ss/cmms/cmms-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CMMSServiceRequestService } from '../c-m-m-s-service-request.service';
import { CMMSWorkOrderService } from '@ss/cmms/work-order';
import { DOC_WORK_ORDER } from '@ss/logistics/api-transaction';
import { of, switchMap } from 'rxjs';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-service-request-list',
    templateUrl: './service-request-list.component.html',
    styleUrls: ['./service-request-list.component.css'],
    standalone: true,
    imports: [
        MaterialModule,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DatePipe,
        TranslatePipe,
        TranslateDirective
    ],
})
export class ServiceRequestListComponent extends BaseEntityListComponent<Work> implements OnInit {
    private workOrderSrv = inject(CMMSWorkOrderService);
    private generateButton: ToolbarButton = {
        icon: 'fa-solid fa-person-digging',
        label: 'CMMS_GENERATE_WORK_ORDER',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.generateWorkOrder()
    };

    public Types = WORK_TYPES;
    displayedColumns = [
        'number',
        'date',
        'description',
        'assetDescription',
        'requesterDescription',
        'typeDescription',
        'faultDescription',
        'plannedStart',
        'plannedDue',
        'statusDescription'
    ];

    constructor(
        public override entitySrv: CMMSServiceRequestService,
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
            'CMMS_SERVICE_REQUEST');
        this.pagination.pageSize = 15;
    }

    private generateWorkOrder() {
        if (this.selectedRow) {
            const wo: Work = {...this.selectedRow, id: 0, number: 0, document: DOC_WORK_ORDER, date: new Date(), sourceId: this.selected, memo: null, status: null};
            this.confirmationSrv
                .confirm('CMMS_GENERATION', 'CMMS_GENERATE_WORK_ORDER')
                .pipe(switchMap(b => b? this.workOrderSrv.save(wo) : of(0)))
                .subscribe(res => {
                    if (res > 0) {
                        this.snackBarSrv.showSuccessMessage();
                    }
                });
        }
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.shellSrv.addButton(this.generateButton);
    }

    override selectRow(row: Work) {
        super.selectRow(row);
        this.generateButton.disabled = row?.destinationId > 0;
    }
}

