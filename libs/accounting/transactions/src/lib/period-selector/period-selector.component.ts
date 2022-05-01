import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {PeriodSelectorService, PeriodSummary} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService, PaginatorPersistenceService} from '@ss/common/api-common';
import {FormControl, Validators} from '@angular/forms';
import {Observable, tap} from 'rxjs';

@Component({
  selector: 'ss-period-selector',
  templateUrl: './period-selector.component.html',
  styleUrls: ['./period-selector.component.scss']
})
export class PeriodSelectorComponent extends BaseEntityListComponent<PeriodSummary> {
    private MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    displayedColumns = [
        'month',
        'debit',
        'credit'
    ];
    accPeriod = new FormControl(1, [Validators.required, Validators.max(12), Validators.min(1)]);
    periods: string[] = [];
    constructor(
        public override entitySrv: PeriodSelectorService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private loginSrv: LoginService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ACC_PERIOD_SELECTION');
    }

    override preload(): Observable<any> {
        return this.loginSrv.loadContext();
    }

    override finishLoading(data: PeriodSummary[]) {
        const error = data.filter(e => Math.abs(e.debit - e.credit) >= 0);
        const maxMonth = (error.length > 0)? error[error.length - 1].id - 1 : 11;
        this.periods = this.MONTHS.filter((e, i) => i <= maxMonth);
        data.forEach(e => e.month = this.MONTHS[e.id - 1]);
        super.finishLoading(data);
    }

    selectPeriod() {
        const ctx = this.loginSrv.appCtx;
        this.entitySrv
            .selectFolder(ctx.accFile, ctx.accYear, this.accPeriod.value)
            .pipe(tap(ctx => this.loginSrv.updateCtx(ctx)))
            .subscribe(res => {
                this.snackBarSrv.showSuccessMessage();
                this.shellSrv.goBack();
            })
    }

    balance(row: PeriodSummary) {
        return Math.abs(row?.debit - row?.credit) >= 0.01;
    }
}
