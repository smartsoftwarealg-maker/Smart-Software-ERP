import { Component, inject } from '@angular/core';

import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Criterion } from '../gica-careers-api';
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

import { FormControl } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CriterionService } from '../services/criterion.service';
import { Category, CategoryService } from '@ss/common/api-lookup';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-gica-criteria-list',
    standalone: true,
    imports: [
    MaterialModule,
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
    TranslateDirective,
    MatHeaderCellDef,
    MatFormField,
    PaginationComponent,
    UiAutoCompleteComponent
],
    templateUrl: './criteria-list.component.html',
    styleUrl: './criteria-list.component.css',
})
export class CriteriaListComponent extends BaseEntityListComponent<Criterion> {
    private categorySrv = inject(CategoryService);

    categoryLookup = new DefaultAutoCompleteModel(this.categorySrv);
    employee = new FormControl<number>(0);

    displayedColumns = [
        'description',
        'grade',
    ];

    constructor(
        public override entitySrv: CriterionService,
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
            'PAYROLL_CRITERIA');
        this.pagination.pageSize = 15;
        if (!this.entitySrv.getParentId()) {
            this.entitySrv.setParentId(0);
        }
        this.categoryLookup.onObjectSelected = e => this.refreshCategory(e);
        this.employee.setValue(this.entitySrv.getParentId());
    }

    private refreshCategory(e: Category) {
        this.entitySrv.setParentId(e.id);
        this.refresh();
    }
}
