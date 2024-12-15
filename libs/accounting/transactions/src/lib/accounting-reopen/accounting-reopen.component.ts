import { Component, inject } from "@angular/core";
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {PeriodSelectorService, PeriodSummary, ReopenInfo} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LanguageService, LoginService, MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import {Observable} from 'rxjs';
import { ReactiveFormsModule, UntypedFormControl, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";




import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';


@Component({
  selector: 'ss-accounting-reopen',
  templateUrl: './accounting-reopen.component.html',
  styleUrls: ['./accounting-reopen.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,


       


    ],
})
export class AccountingReopenComponent extends BaseEntityListComponent<PeriodSummary> {
    private loginSrv  = inject(LoginService);
    private langSrv  = inject(LanguageService);

    private MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    private label = `${this.langSrv.translate('ACC_REOPENING')} ${this.loginSrv.appCtx.accYear}`;
    generating = false;
    balancedFolder = false;
    description = new UntypedFormControl(this.label,[Validators.required, Validators.maxLength(50)]);
    displayedColumns = [
        'month',
        'debit',
        'credit'
    ];
    constructor(
        public override entitySrv: PeriodSelectorService,
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
            'ACC_REOPENING');
        entitySrv.offset = -1;
    }

    override preload(): Observable<any> {
        return this.loginSrv.loadContext();
    }

    override finishLoading(data: PeriodSummary[]) {
        data.forEach(e => e.month = this.MONTHS[e.id - 1]);
        this.balancedFolder = data.find(e => Math.abs(e.debit - e.credit) >= 0.01) == undefined;
        super.finishLoading(data);
    }


    balance(row: PeriodSummary) {
        return Math.abs(row?.debit - row?.credit) >= 0.01;
    }

    override ngOnInit() {
        this.editButton.visible = false;
        this.deleteButton.visible = false;
        this.addButton.visible = false;
        super.ngOnInit();
    }

    reopen() {
        const params: ReopenInfo = {description: this.description.value, detail: false};
        this.generating = true;
        this.entitySrv
            .reopen(params)
            .subscribe({
                next: res => {
                    this.snackBarSrv.showSuccessMessage();
                    this.generating = false;
                },
                error: err => {
                    this.generating = false;
                    throw err;
                }
            });
    }
}
