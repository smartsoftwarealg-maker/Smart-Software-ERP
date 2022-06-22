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

@Component({
    selector: 'ss-checks-list',
    styleUrls: ['./check-list.component.scss'],
    templateUrl: './check-list.component.html'
})
export class CheckListComponent extends BaseEntityListComponent<Check> implements OnInit {

    displayedColumns = [
        'description',
        'number',
        'amount',
        'agent',
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
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(checkSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'TRS_CHECKS');
    }

    public processLoadedData(data: Check[]): Observable<Check[]> {
        data.forEach(c => {
            c.date = removeTimeForDateStr(ymdToDmy(c.date));
            c.depositDate = removeTimeForDateStr(ymdToDmy(c.depositDate));
            c.processDate = removeTimeForDateStr(ymdToDmy(c.processDate));
        });
        return of(data);
    }

    ngOnInit() {
        super.ngOnInit();
    }
}
