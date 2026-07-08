import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckDepositService, CheckDeposit } from '@ss/treasury/api-check-deposits';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import {
    MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell,
    MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow
} from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { AsyncPipe, DatePipe } from '@angular/common';
import { BankDescriptionPipe } from '@ss/administration/api-bank';

@Component({
    selector: 'ss-check-deposit-list',
    styleUrls: ['./check-deposit-list.component.scss'],
    templateUrl: './check-deposit-list.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective,
        MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow,
        PaginationComponent, DatePipe, BankDescriptionPipe, AsyncPipe
    ]
})
export class CheckDepositListComponent extends BaseEntityListComponent<CheckDeposit> {

    displayedColumns = ([
        'depositNumber',
        'depositDate',
        'bankName',
        'description',
        'creatorName',
        'createdAt'
    ]);

    constructor(
        public checkDepositSrv: CheckDepositService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(checkDepositSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'TRS_CHECK_DEPOSITS');
    }
}
