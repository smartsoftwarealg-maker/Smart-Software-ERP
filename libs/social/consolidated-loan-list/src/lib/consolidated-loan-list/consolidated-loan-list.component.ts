import { Component, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginationModel, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';


import { Consumption, Loan } from '@ss/remuneration/loans';
import { LoansConsumptionService } from '@ss/remuneration/loans';
import { ConsolidatedLoansService } from '../consolidated-loans.service';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaymonthPipe } from '@ss/payroll-common';
import { Observable, tap } from 'rxjs';

@Component({
    selector: 'ss-consolidated-loan-list',
    templateUrl: './consolidated-loan-list.component.html',
    styleUrls: ['./consolidated-loan-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        PaginationComponent,
        PaymonthPipe
    ]
})
export class ConsolidatedLoanListComponent extends BaseEntityListComponent<Loan> implements OnInit {
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
    public readonly detailPagination = PaginationModel.newInstance();

    constructor(
        public infoSrv: ConsolidatedLoansService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
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
        this.detailPagination.onChange = () => this.refreshDetail();
        this.detailPagination.pageSize = 50;
    }

    private refreshDetail() {
        this.consumptionSrv
            .getList(this.detailPagination.page - 1, this.detailPagination.pageSize)
            .subscribe(res => {
                this.consumptionList = res.body;
                this.detailPagination.elementCount = res.itemCount;
            });
    }

    override selectRow(row: Loan) {
        super.selectRow(row);
        this.consumptionSrv.setParentId(this.selected);
        this.refreshDetail();
    }

    protected override preInit(): Observable<unknown> {
        return super.preInit()
            .pipe(tap(() => {
                this.addButton.visible = false;
                this.editButton.visible = false;
                this.deleteButton.visible = false;
            }));
    }

    override ngOnInit() {
        super.ngOnInit();
    }
}
