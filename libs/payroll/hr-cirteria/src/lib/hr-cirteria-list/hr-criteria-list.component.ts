import { Component, inject } from '@angular/core';

import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    MaterialModule,
    PaginatorPersistenceService,
} from '@ss/common/api-common';
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
    MatTable,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { Category, CategoryService } from '@ss/common/api-lookup';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { HrCriterion } from '../hr-criteria-api';
import { HrCriterionService } from '../hr-criterion.service';

@Component({
    selector: 'ss-hr-criteria-list',
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
    templateUrl: './hr-criteria-list.component.html',
    styleUrl: './hr-criteria-list.component.scss',
})
export class HrCriteriaListComponent extends BaseEntityListComponent<HrCriterion> {
    private categorySrv = inject(CategoryService);

    categoryLookup = new DefaultAutoCompleteModel(this.categorySrv);
    employee = new FormControl<number>(0);

    displayedColumns = ['description', 'grade'];

    constructor(
        public override entitySrv: HrCriterionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'PAYROLL_HR_CRITERIA',
        );
        this.pagination.pageSize = 15;
        if (!this.entitySrv.getParentId()) {
            this.entitySrv.setParentId(0);
        }
        this.categoryLookup.onObjectSelected = (e) => this.refreshCategory(e);
        this.employee.setValue(this.entitySrv.getParentId());
    }

    private refreshCategory(e: Category) {
        this.entitySrv.setParentId(e.id);
        this.refresh();
    }
}
