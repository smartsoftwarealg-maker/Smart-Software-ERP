import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Compensation, Debt } from '../services/compensation-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { DebtService } from '../services/debt.service';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { CompensationService } from '../services/compensation.service';
import { InvoicePaymentService } from '../services/invoice-payment.service';
import { CompensationDetailService } from '../services/compensation-detail.service';
import { MatRadioButton, MatRadioChange, MatRadioGroup } from '@angular/material/radio';

@Component({
    selector: 'ss-debts',
    imports: [CommonModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, PaginationComponent, TranslateDirective, MatHeaderCellDef, RouterOutlet, MatRadioGroup, MatRadioButton],
    templateUrl: './debts.component.html',
    styleUrl: './debts.component.scss',
})
export class DebtsComponent extends BaseEntityListComponent<Debt> {
    #compensationDetailSrv = inject(CompensationDetailService);
    #compensationSrv = inject(CompensationService);
    #paymentSrv = inject(InvoicePaymentService);

    displayedColumns = ['date', 'invoiceNumber', 'customerCode', 'customerName', 'ftt', 'payment'];

    constructor(
        public override entitySrv: DebtService,
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
            'SCH_COMPENSATIONS');
        this.pagination.pageSize = 5;
    }

    override ngOnInit() {
        this.deleteButton.visible = this.editButton.visible = this.addButton.visible = false;
        super.ngOnInit();
    }

    override selectRow(d: Debt) {
        super.selectRow(d);
        this.#compensationSrv.setParentId(d?.id||0);
        this.#compensationDetailSrv.setParentId(d?.id||0);
        this.#paymentSrv.setParentId(d?.agentId||0);
    }

    onChange(e: MatRadioChange) {
        this.entitySrv.selectionMode = +e.value as 1|2|3;
        this.refresh();
    }

    protected override canShowProcessingStatus(): boolean {
        return false;
    }
}
