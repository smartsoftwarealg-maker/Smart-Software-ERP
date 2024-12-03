import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {Special, SpecialPayrollService} from '@ss/remuneration/special-payroll-common';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';

@Component({
    selector: 'ss-special-payroll-list',
    templateUrl: './special-payroll-list.component.html',
    styleUrls: ['./special-payroll-list.component.scss'],
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class SpecialPayrollListComponent extends BaseEntityListComponent<Special> implements OnInit {
    displayedColumns = ['description', 'paymonth'];

    constructor(
        public infoSrv: SpecialPayrollService,
        override shellSrv: ShellService,
        override snackBarSrv: SnackBarService,
        override route: ActivatedRoute,
        override confirmationSrv: ConfirmationDialogService,
        override defReportSrv: DefaultReportService,
        override router: Router,
        private monthSelectorSrv: PayrollMonthService,
        override pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_SPECIAL_PAYROLLS');
        this.pagination.pageSize = 15;
    }


    override ngOnInit(): void {
        super.ngOnInit();
        this.monthSelectorSrv
            .isUpdatableMonth()
            .subscribe(upd => {
                this.editButton.visible = upd;
                this.deleteButton.visible = upd;
                this.addButton.visible = upd;
            });
    }
}
