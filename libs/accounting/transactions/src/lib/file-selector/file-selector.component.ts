import {Component, OnInit} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ACCFile, AccFileService, PeriodSelectorService} from '@ss/accounting/accounting-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LoginService, MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import {switchMap, tap} from 'rxjs';
import { ReactiveFormsModule, UntypedFormControl, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { CommonUiMainPageModule } from "@ss/common/ui-main-page";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { AppArchiveModule } from "@ss/common/app-archive";

@Component({
  selector: 'ss-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
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
export class FileSelectorComponent extends BaseEntityListComponent<ACCFile> implements OnInit {
    private MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    accPeriod = new UntypedFormControl(1, [Validators.required, Validators.max(12), Validators.min(1)]);
    periods: string[] = [];
    maxPeriod = 1;

    displayedColumns = [
        'description',
        'fileYear',
        'closed'
    ];

    constructor(
        public override entitySrv: AccFileService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private periodSrv: PeriodSelectorService,
        private loginSrv: LoginService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ACC_FILE_SELECTOR');
        this.pagination.pageSize = 10;
    }

    override ngOnInit() {
        this.editButton.visible = false;
        this.addButton.visible = false;
        this.deleteButton.visible = false;
        super.ngOnInit();

        const selectButton: ToolbarButton = {
            icon: 'fa-solid fa-check',
            label: 'ACC_SELECT_FOLDER',
            disabled: false,
            visible: true,
            keepOnToolbar: KeepOnToolbar.DYNAMIC,
            click: () => {
                this.selectFolder();
            }
        };
        this.shellSrv.addButton(selectButton);
        this.shellSrv.updateShell();
        this.accPeriod.setValue(this.loginSrv.appCtx.accPeriod || 1);
        this.shellSrv.setGoBackPath('..', this.route);
        this.periods = this.MONTHS.filter((e, i) => i <= this.maxPeriod);
    }

    selectFolder() {
        this.entitySrv
            .selectFolder(this.selectedRow?.id || 0, this.selectedRow?.fileYear || 0, this.accPeriod.value)
            .pipe(tap(ctx => this.loginSrv.updateCtx(ctx)))
            .subscribe(res => {
                if (this.selectedRow) {
                    this.entitySrv.accFile = this.selectedRow;
                    this.shellSrv.setLabels([{ title: `${this.selectedRow.description}` }]);
                }
                this.snackBarSrv.showSuccessMessage();
                this.shellSrv.goBack();
            })
    }

    override finishLoading(data: ACCFile[]) {
        super.finishLoading(data);
        this.selected = data.find(e => e.fileYear === this.loginSrv.appCtx.accYear)?.id;
    }

    override select(id: number) {
        super.select(id);
        this.entitySrv
            .selectFolder(this.selectedRow?.id || 0, this.selectedRow?.fileYear || 0, 1)
            .pipe(tap(ctx => this.loginSrv.updateCtx(ctx)),
                switchMap(_ => this.periodSrv.getList(0, 50)))
            .subscribe(res => {
                const data = res.body;
                const error = data.filter(e => Math.abs(e.debit - e.credit) >= 0);
                const maxMonth = (error.length > 0)? error[error.length - 1].id - 1 : 11;
                this.periods = this.MONTHS.filter((e, i) => i <= maxMonth);
                this.maxPeriod = maxMonth;
            });
    }
}
