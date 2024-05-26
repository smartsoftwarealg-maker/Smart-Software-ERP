import { Component, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { EmployeeAidService, SocialAid } from '@social/social-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-employee-aids-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, UiPaginationModule, MatHeaderCellDef],
    templateUrl: './employee-aids-list.component.html',
    styleUrl: '../../../../social-api/src/lib/aids.styles.scss',
})
export class EmployeeAidsListComponent extends BaseEntityListComponent<SocialAid> {
    #_effect = effect(() => this.refreshData());
    employeeId = input(0);

    displayedColumns = [
        'typeDescription',
        'number',
        'date',
        'amount',
        'installmentCount'
    ];
    constructor(
        public override entitySrv: EmployeeAidService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'SOCIAL_WORKS');
        this.pagination.pageSize = 10;
    }

    private refreshData() {
        this.entitySrv.setParentId(this.employeeId());
        this.refresh();
    }

}
