import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CustomerComplaint } from '../customer-complaint.class';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, PaginatorPersistenceService } from '@ss/common/api-common';
import { CustomerComplaintsService } from '../customer-complaint.service';

import {
    MatCell, MatCellDef, MatColumnDef,
    MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Observable, tap } from 'rxjs';


@Component({
    selector: 'ss-customer-complaints-list',
    standalone: true,
    imports: [
        CommonModule,
        MatCell,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatRow,
        MatSort,
        MatSortHeader,
        MatTable,
        PaginationComponent,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        TranslateDirective
    ],
    templateUrl: './customer-complaints-list.component.html',
    styleUrl: './customer-complaints-list.component.css',
})
export class CustomerComplaintsListComponent extends BaseEntityListComponent<CustomerComplaint>{
    private loginSrv = inject(LoginService);

    displayedColumns = [
        'date',
        'complaintDescription',
        'complaint',
        'answer'
    ];

    constructor(
        public override entitySrv: CustomerComplaintsService,
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
            'COMMON_COMPLAINTS');
        this.pagination.pageSize = 15;
    }

    protected override preInit(): Observable<unknown> {
        return super.preInit()
            .pipe(tap(() => {
                this.deleteButton.visible = this.addButton.visible = (this.loginSrv.appCtx.agentId||0) > 0;
            }));
    }

    override selectRow(row: CustomerComplaint) {
        super.selectRow(row);
        this.editable = this.editable && (row?.answer?.length || 0) == 0;
    }

    override ngOnInit() {
        if((this.loginSrv.appCtx.agentId||0) == 0) {
            this.displayedColumns.splice(1,0,'agentDescription');
        }
        super.ngOnInit();
    }
}
