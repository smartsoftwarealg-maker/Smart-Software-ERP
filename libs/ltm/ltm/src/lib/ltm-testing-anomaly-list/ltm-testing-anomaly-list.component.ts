import { Component, DestroyRef, inject } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { LTMTestingAnomaly } from "../ltm-api";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { dateToYmdStr, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { LtmTestingAnomalyService } from "../services/ltm-testing-anomaly.service";
import { callback } from 'chart.js/helpers';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'ss-ltm-testing-anomaly-list',
    templateUrl: './ltm-testing-anomaly-list.component.html',
    styleUrls: ['./ltm-testing-anomaly-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,

        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
})
export class LtmTestingAnomalyListComponent extends BaseEntityListComponent<LTMTestingAnomaly> {
    #destroyRef = inject(DestroyRef);
    #TODAY = new Date();


    displayedColumns = ['date', 'matterDescription', 'anomalyDescription', 'memo', 'pickupPointDescription', 'userDescription'];
    from = new FormControl<Date>(this.#TODAY);
    to   = new FormControl<Date>(this.#TODAY);

    constructor(
        public override entitySrv: LtmTestingAnomalyService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LTM_TESTING_ANOMALIES');
        this.pagination.pageSize = 15;
    }

    override getPage(): Observable<LTMTestingAnomaly[]> {
        const from = dateToYmdStr(this.from.value);
        const to   = dateToYmdStr(this.to.value);
        const filter = `${this.filter||''}//${from}~${to}`
        return this.entitySrv.getPage(this.pagination, filter, this.sortBy);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.from.setValue(this.entitySrv.from);
        this.to.setValue(this.entitySrv.to);
        this.from
            .valueChanges
            .pipe(
                takeUntilDestroyed(this.#destroyRef),
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(() => this.doRefresh())
        this.to
            .valueChanges
            .pipe(
                takeUntilDestroyed(this.#destroyRef),
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(() => this.doRefresh())
    }

    private doRefresh() {
        this.entitySrv.from = this.from.value;
        this.entitySrv.to   = this.to.value;
        this.refresh();
    }
}
