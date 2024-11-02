import { Component } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { RemunerationPaymonthEditorModule } from '@ss/remuneration/paymonth-editor';
import { CommonPayrollModule } from '@ss/payroll-common';
import { Consumption, Loan } from '@ss/remuneration/loans';
import { LoansConsumptionService } from '@ss/remuneration/loans';
import { ConsolidatedLoansService } from '../consolidated-loans.service';

@Component({
    selector: 'ss-consolidated-loan-list',
    templateUrl: './consolidated-loan-list.component.html',
    styleUrls: ['./consolidated-loan-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        UiPaginationModule,
        CommonUiLangModule,
        CommonUiAutoCompleteModule,
        RemunerationPaymonthEditorModule,
        CommonPayrollModule
    ]
})
export class ConsolidatedLoanListComponent extends BaseEntityListComponent<Loan> {
    consumptionList: Consumption[] = [];
    consumptionColumns = [
        'paymonth',
        'consumption',
        'remaining'
    ];

    displayedColumns = [
        'employee',
        'lastName',
        'firstName',
        'description',
        'date',
        'amount',
        'taken_amount',
        'number',
        'monthConsumed'
    ];

    constructor(
        public infoSrv: ConsolidatedLoansService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
        private consumptionSrv: LoansConsumptionService) {
        super(infoSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'PAYROLL_LOANS');
        this.pagination.pageSize = 15;
    }

    override selectRow(row: Loan) {
        super.selectRow(row);
        this.consumptionSrv.setParentId(this.selected);
        this.consumptionSrv
            .getList(0, 50)
            .subscribe(res => this.consumptionList = res.body);
    }
}
