import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {PeriodSelectorService, PeriodSummary} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LoginService, MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import { ReactiveFormsModule, UntypedFormControl, Validators } from "@angular/forms";
import {Observable, tap} from 'rxjs';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { CommonUiMainPageModule } from "@ss/common/ui-main-page";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { AppArchiveModule } from "@ss/common/app-archive";

@Component({
  selector: 'ss-period-selector',
  templateUrl: './period-selector.component.html',
  styleUrls: ['./period-selector.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiMainPageModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        CommonUiConfirmationDialogModule,
        AppArchiveModule
    ],
})
export class PeriodSelectorComponent extends BaseEntityListComponent<PeriodSummary> {
    private MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    displayedColumns = [
        'month',
        'debit',
        'credit'
    ];
    accPeriod = new UntypedFormControl(1, [Validators.required, Validators.max(12), Validators.min(1)]);
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
        const error = data.filter(e => this.imbalance(e));
        const maxMonth = (error.length > 0)? error[error.length - 1].id - 1 : 11;
        this.periods = this.MONTHS.filter((e, i) => i <= maxMonth);
        data.forEach(e => e.month = this.MONTHS[e.id - 1]);
        super.finishLoading(data);
    }

    selectPeriod() {
        const ctx = this.loginSrv.appCtx;
        this.entitySrv
            .selectFolder(ctx.accFile, ctx.accYear, this.accPeriod.value)
            .pipe(tap(ctx => this.loginSrv.setContext(ctx)))
            .subscribe(res => {
                this.snackBarSrv.showSuccessMessage();
                this.shellSrv.goBack();
            })
    }

    imbalance(row: PeriodSummary): boolean {
        return Math.abs(row?.debit - row?.credit) >= 0.01;
    }

    override ngOnInit() {
        this.editButton.visible = false;
        this.deleteButton.visible = false;
        this.addButton.visible = false;
        super.ngOnInit();
        this.shellSrv.updateShell();
    }
}
