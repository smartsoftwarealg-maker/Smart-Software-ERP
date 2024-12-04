import { Component, OnInit, } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckService, Check } from '@ss/treasury/api-checks';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { HttpService, PaginatorPersistenceService, ymdToDmy, removeTimeForDateStr } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatCheckbox } from '@angular/material/checkbox';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'ss-checks-list',
    styleUrls: ['./check-list.component.scss'],
    templateUrl: './check-list.component.html',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatCheckbox, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, DecimalPipe]
})
export class CheckListComponent extends BaseEntityListComponent<Check> implements OnInit {

    displayedColumns = [
        'description',
        'number',
        'debit',
        'credit',
        'agentName',
        'date',
        'due_days',
        'bank',
        'deposited',
        'canceled',
        'depositDate',
        'depositNumber',
        'processDate',
        'memo'
    ];

    constructor(
        public checkSrv: CheckService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(checkSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'TRS_CHECKS');
        this.pagination.pageSize = 10;
    }

    public override processLoadedData(data: Check[]): Observable<Check[]> {
        data.forEach(c => {
            c.date = removeTimeForDateStr(ymdToDmy(c.date));
            c.depositDate = removeTimeForDateStr(ymdToDmy(c.depositDate));
            c.processDate = removeTimeForDateStr(ymdToDmy(c.processDate));
        });
        return of(data);
    }
}
