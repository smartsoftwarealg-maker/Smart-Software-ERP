import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LTMLine, LTMTesting} from '../ltm-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { dateToStr, MaterialModule, PaginatorPersistenceService, ymdToDmy } from "@ss/common/api-common";
import {LtmTestingService} from '../services/ltm-testing.service';
import {map, Observable} from 'rxjs';
import {LtmLineService} from '../services/ltm-line.service';
import {MatDialog} from '@angular/material/dialog';
import {LtmInjectionComponent} from '../ltm-injection/ltm-injection.component';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { ReactiveFormsModule } from "@angular/forms";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";

@Component({
    selector: 'ss-ltm-testing-list',
    templateUrl: './ltm-testing-list.component.html',
    styleUrls: ['./ltm-testing-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        LogisticsUiDocInfoModule,
        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
})
export class LtmTestingListComponent extends BaseEntityListComponent<LTMTesting> implements OnInit {
    private injectBtn: ToolbarButton = {
        icon: 'fa-regular fa-syringe',
        label: 'COMMON_EXCEL_INJECTION',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.inject()
    };
    lines$: Observable<LTMLine[]> = null;

    displayedColumns = ['matter', 'test', 'timeStamp', 'value'];

    constructor(
        public override entitySrv: LtmTestingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
        private lineSrv: LtmLineService,
        private dialog: MatDialog) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            "LTM_TESTINGS");
        this.lines$ = this.lineSrv
            .getList(0, 50)
            .pipe(map(_ => _.body));
        this.pagination.pageSize = 10;
    }

    private lastMonth(): string {
        const now = new Date();
        now.setMonth(now.getMonth() - 1);
        return ymdToDmy(dateToStr(now));
    }

    override ngOnInit() {
        super.ngOnInit();
        if (this.editable) {
            this.shellSrv.addButton(this.injectBtn);
        }
        this.shellSrv.searchFormControl.setValue(this.lastMonth());
        this.refresh();
    }

    private inject() {
        const dialogRef = this.dialog.open(LtmInjectionComponent, {
            width: '600px',
            height: '520px',
            disableClose: true
        });

        dialogRef
            .afterClosed()
            .subscribe(result => {
                if (result && result['count']) {
                    this.snackBarSrv.showMessage('COMMON_SUCCESS');
                    this.refresh(() => this.shellSrv.setLoading(false));
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
            });
    }
}
