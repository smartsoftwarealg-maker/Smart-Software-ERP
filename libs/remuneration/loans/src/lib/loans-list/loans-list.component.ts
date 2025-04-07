import { Component } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Consumption, Loan } from '../loans-class';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { LoansService } from '../loans.service';
import { LoansConsumptionService } from '../loans-consumption.service';
import { CommonModule } from '@angular/common';


import { PaginationComponent } from '@ss/common/ui-pagination';
import { PaymonthPipe } from '@ss/payroll-common';
import { TranslateDirective } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-loans-list',
    templateUrl: './loans-list.component.html',
    styleUrls: ['./loans-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        PaginationComponent,
        PaymonthPipe
    ]
})
export class LoansListComponent extends BaseEntityListComponent<Loan> {
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
        'monthConsumed',
        "memo",
        "paidAmount"
    ];

    constructor(
        public infoSrv: LoansService,
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
