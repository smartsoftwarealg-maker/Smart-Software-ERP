import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseEntityListComponent } from "@ss/common/ui-base-entity";
import { LTMLine, LTMTesting } from "../ltm-api";
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from "@ss/common/ui-shell";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultReportService } from "@ss/common/ui-default-report-component";
import { dateToStr, MaterialModule, PaginatorPersistenceService, ymdToDmy } from '@ss/common/api-common';
import { LtmTestingService } from '../services/ltm-testing.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { LtmLineService } from '../services/ltm-line.service';
import { MatDialog } from '@angular/material/dialog';
import { LtmInjectionComponent } from '../ltm-injection/ltm-injection.component';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { LtmMatterService } from '../services/ltm-matter.service';
import { callback } from 'chart.js/helpers';

@Component({
    selector: "ss-ltm-testing-list",
    templateUrl: "./ltm-testing-list.component.html",
    styleUrls: ["./ltm-testing-list.component.scss"],
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
    ]
})
export class LtmTestingListComponent extends BaseEntityListComponent<LTMTesting> implements OnInit {
    private matterSrv = inject(LtmMatterService);
    private injectBtn: ToolbarButton = {
        icon: "fa-regular fa-syringe",
        label: "COMMON_EXCEL_INJECTION",
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.inject()
    };
    lines$: Observable<LTMLine[]> = null;
    matterCtrl = new FormControl<number>(0);
    fromCtrl = new FormControl<Date>(new Date());
    toCtrl = new FormControl<Date>(new Date());
    matterLookup = new DefaultAutoCompleteModel(this.matterSrv);

    displayedColumns = ['matter', 'test', 'timeStamp', 'value', 'selection'];
    selection = signal<number[]>([]);

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
        this.fromCtrl.setValue(this.lastMonth());
        this.entitySrv.setParentId(this.entitySrv.getParentId() || 0);
        this.matterCtrl.setValue(this.entitySrv.getParentId());
        this.matterLookup.onObjectSelected = m => {
            this.entitySrv.setParentId(m?.id || 0);
            this.refresh();
        }
    }

    private lastMonth(): Date {
        const now = new Date();
        now.setMonth(now.getMonth() - 1);
        return now;
    }

    override ngOnInit() {
        super.ngOnInit();
        if (this.editable) {
            this.shellSrv.addButton(this.injectBtn);
        }
    }

    private inject() {
        const dialogRef = this.dialog.open(LtmInjectionComponent, {
            width: "600px",
            height: "520px",
            disableClose: true
        });

        dialogRef
            .afterClosed()
            .subscribe(result => {
                if (result && result["count"]) {
                    this.snackBarSrv.showMessage("COMMON_SUCCESS");
                    this.refresh(() => this.shellSrv.setLoading(false));
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
            });
    }

    addId(id: number) {
        if (this.selection().indexOf(id) < 1) {
            this.selection.update(values => [...values, id]);
        } else {
            this.selection.update(values => [...values.filter(_ => _ !== id)]);
        }
    }

    addAll(event: MatCheckboxChange) {
        this.selection.set(event.checked ? this.data.map(d => d.id) : []);
    }

    isSelected(id: number) {
        return this.selection().indexOf(id) > -1;
    }

    override deleteSelected() {
        if (this.selection().length > 0) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(ans => {
                    if (ans) {
                        this.shellSrv.setLoading(true);
                        return this.entitySrv.deleteAll(this.selection());
                    } else {
                        return of({ count: 0 });
                    }
                }))
                .subscribe({
                    next: res => {
                        this.shellSrv.setLoading(false);
                        if (res.count > 0) {
                            this.snackBarSrv.showSuccessMessage();
                            this.refresh();
                        }
                    },
                    error: err => {
                        this.snackBarSrv.showFailureMessage();
                        this.shellSrv.setLoading(false);
                        throw err;
                    }
                });
        }
    }

    override getPage(): Observable<LTMTesting[]> {
        const filter = this.filter || `${dateToStr(this.fromCtrl.value)}~${dateToStr(this.toCtrl.value)}`;
        return this.entitySrv.getPage(this.pagination, filter, this.sortBy);
    }
}
