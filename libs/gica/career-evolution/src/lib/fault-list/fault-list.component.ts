import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Fault } from '../gica-careers-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';

import { FaultService } from '../services/fault.service';
import { FormControl } from '@angular/forms';
import { EmployeeService, IEmployee, PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { MatFormField } from '@angular/material/form-field';
import { CommonUiLookupModule } from '@ss/common/ui-lookup';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-gica-fault-list',
    standalone: true,
    imports: [CommonModule,

        MaterialModule,
        CommonUiAutoCompleteModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,

        MatHeaderCellDef,
        MatFormField,
        CommonUiLookupModule, PaginationComponent],
    templateUrl: './fault-list.component.html',
    styleUrl: './fault-list.component.css',
})
export class FaultListComponent extends BaseEntityListComponent<Fault> {
    private employeeSrv = inject(EmployeeService);

    employeeLookup: PersonAutocompleteClass = new PersonAutocompleteClass(this.employeeSrv);
    employee = new FormControl<number>(0);

    displayedColumns = [
        'motiveDescription',
        'count'
    ];

    constructor(
        public override entitySrv: FaultService,
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
            'PAYROLL_CAREER_FAULTS');
        this.pagination.pageSize = 15;
        if (!this.entitySrv.getParentId()) {
            this.entitySrv.setParentId(0);
        }
        this.employeeLookup.onObjectSelected = e => this.refreshEmployee(e);
        this.employee.setValue(this.entitySrv.getParentId());
    }

    private refreshEmployee(e: IEmployee) {
        this.entitySrv.setParentId(e.id);
        this.refresh();
    }
}
