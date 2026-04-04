import { Component, inject, signal } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Dashboard } from '../dashboard';
import {
    KeepOnToolbar,
    ShellService,
    SnackBarService,
    ToolbarButton,
} from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { LookupsService } from '@ss/common/api-lookup';
import { asapScheduler, of, scheduled, takeWhile, tap, timer } from 'rxjs';
import {
    APP_DASHBOARD,
    APPLICATIONS,
    dateToYmdStr,
    getApplicationId,
    LanguageService,
    MaterialModule,
    PaginationModel,
    PaginatorPersistenceService,
} from '@ss/common/api-common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AgentLookupModel, AgentService } from '@ss/logistics/api-agent';
import { Id, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { Sort } from '@angular/material/sort';
import { AccessRightsService } from '@ss/common/api-access-rights';

@Component({
    selector: 'ss-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        DatePickerComponent,
        PaginationComponent,
        UiAutoCompleteComponent,
    ],
})
export class DashboardComponent extends BaseEntityListComponent<Dashboard> {
    #accessRightsSrv = inject(AccessRightsService);
    #POLL_INTERVAL_MS = 3000; // Poll every 3 seconds

    private agentSrv = inject(AgentService);
    private langSrv = inject(LanguageService);
    private chartComponent: Chart | null = null;

    applications = signal(APPLICATIONS);
    showApplications = signal(false);
    generating = signal(false);

    headers: string[] = ['test'];
    dashboardData: any[][] = [['test']];
    detailPagination = PaginationModel.newInstance({
        page: 1,
        pageSize: 50,
        elementCount: 0,
    });
    time = new Date().getTime();
    application = new FormControl<number>(1);
    filterCtrl = new FormControl<string>('');
    toDate = new FormControl(new Date());
    fromDate = new FormControl(new Date(this.time)); // - 365 * 24 * 3600 * 1000
    consolidated = new FormControl<boolean>(false);
    agentLookup = new AgentLookupModel(this.agentSrv);
    tableWidth = '1000';
    selectedAgentId: Id = '';
    processing = false;
    light = true;
    smallData = signal(true);
    validData = signal(false);

    public csvButton: ToolbarButton = {
        icon: 'fa-solid fa-file-csv',
        label: 'COMMON_CSV_EXPORT',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.csv(),
    };

    constructor(
        public dashboardSrv: DashboardService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            dashboardSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_DASHBOARD_QUERIES',
        );
        this.detailPagination.onChange = () => this.updatePage();
        this.agentLookup.onValueChanged = (id: Id) =>
            (this.selectedAgentId = id);
        Chart.register(...registerables);
    }

    override ngOnInit() {
        const appId = getApplicationId(this.router);
        this.dashboardSrv.setParentId(appId);
        this.showApplications.set(appId === APP_DASHBOARD);
        this.editButton.visible = false;
        this.addButton.visible = false;
        this.deleteButton.visible = false;
        super.ngOnInit();
        this.shellSrv.addButton(this.csvButton);
        this.subscriptions.push(
            this.application.valueChanges
                .pipe(debounceTime(300), distinctUntilChanged())
                .subscribe((id) => {
                    this.dashboardSrv.setParentId(id);
                    this.refresh();
                }),
        );

        // this.shellSrv.addButton(this.jsonButton);
        this.#accessRightsSrv
            .getApps()
            .subscribe((res) =>
                this.applications.update((apps) =>
                    apps.filter((kv) => res.apps.indexOf(kv.description) > -1),
                ),
            );
    }

    override select(id: number) {
        this.validData.set(false);
        super.select(id || getApplicationId(this.router));
        this.headers = [];
        this.dashboardData = [];
        if (id) {
            this.shellSrv.setLoading(true);
            this.dashboardSrv
                .getHeaders(id)
                .pipe(
                    tap((res) => {
                        this.headers = res.headers;
                        this.tableWidth = res.headers.length * 100 + '';
                    }),
                )
                .subscribe(() => this.loadData());
        }
    }

    private updatePage() {
        const from = this.langSrv.formatDate(this.fromDate.value);
        const to = this.langSrv.formatDate(this.toDate.value);
        this.shellSrv.setLoading(true);
        this.dashboardSrv
            .getData(
                this.selected,
                this.detailPagination.page,
                this.detailPagination.pageSize,
                from,
                to,
                this.selectedAgentId,
                this.consolidated.value,
                this.filterCtrl.value,
            )
            .subscribe({
                next: (res) => {
                    this.dashboardData = res.body;
                    this.detailPagination.elementCount = res.itemCount;
                    this.shellSrv.setLoading(false);
                },
                error: (err) => {
                    this.shellSrv.setLoading(false);
                    throw err;
                },
            });
    }

    // override preload(): Observable<any> {
    //     this.dashboardSrv.setParentId(getApplicationId(this.router));
    //     return super.preload();
    // }

    override excel() {
        const from = this.langSrv.formatDate(this.fromDate.value);
        const to = this.langSrv.formatDate(this.toDate.value);
        const consolidated = this.consolidated.value;
        this.generating.set(true);
        this.shellSrv.setLoading(true);

        this.dashboardSrv
            .getExcel(
                this.selected,
                this.detailPagination.page,
                this.detailPagination.pageSize,
                from,
                to,
                this.selectedAgentId,
                consolidated,
            )
            .pipe(
                switchMap((jobId) => {
                    return timer(0, this.#POLL_INTERVAL_MS).pipe(
                        switchMap(() =>
                            this.dashboardSrv.getStatus(
                                `/dashboard/${this.selected}/excel`,
                                jobId,
                            ),
                        ),
                        takeWhile(
                            (statusRes, index) =>
                                statusRes.status === 102 && index < 100,
                            true,
                        ),
                    );
                }),
                switchMap((res) => of(res.body)),
                tap((res) => this.doReportGeneration(<Blob>res)),
            )
            .subscribe({
                next: () => {
                    this.generating.set(false);
                    this.shellSrv.setLoading(false);
                },
                error: (err) => {
                    this.generating.set(false);
                    this.shellSrv.setLoading(false);
                    throw err;
                },
            });
        // *****************************
        // this.dashboardSrv
        //     .getExcel(
        //         this.selected,
        //         this.detailPagination.page,
        //         this.detailPagination.pageSize,
        //         from,
        //         to,
        //         this.selectedAgentId,
        //         consolidated,
        //     )
        //     .subscribe((blob) => {
        //         // saveAs(blob, this.entitySrv.constructor.name + '.xlsx');
        //         if (blob && blob.size > 100) {
        //             const link = document.createElement('a');
        //             link.href = window.URL.createObjectURL(blob);
        //             link.download = this.entitySrv.constructor.name + '.xlsx';
        //             link.click();
        //             setTimeout(
        //                 () => window.URL.revokeObjectURL(link.href),
        //                 5000,
        //             );
        //         }
        //     });
    }

    csv() {
        const from = this.langSrv.formatDate(this.fromDate.value);
        const to = this.langSrv.formatDate(this.toDate.value);
        const consolidated = this.consolidated.value;
        this.generating.set(true);
        this.shellSrv.setLoading(true);

        this.dashboardSrv
            .getCsv(
                this.selected,
                this.detailPagination.page,
                this.detailPagination.pageSize,
                from,
                to,
                this.selectedAgentId,
                consolidated,
            )
            .pipe(
                switchMap((jobId) => {
                    return timer(0, this.#POLL_INTERVAL_MS).pipe(
                        switchMap(() =>
                            this.dashboardSrv.getStatus(
                                `/dashboard/${this.selected}/csv`,
                                jobId,
                            ),
                        ),
                        takeWhile(
                            (statusRes, index) =>
                                statusRes.status === 102 && index < 100,
                            true,
                        ),
                    );
                }),
                switchMap((res) => of(res.body)),
                tap((res) => this.doReportGenerationCsv(<Blob>res)),
            )
            .subscribe({
                next: () => {
                    this.generating.set(false);
                    this.shellSrv.setLoading(false);
                },
                error: (err) => {
                    this.generating.set(false);
                    this.shellSrv.setLoading(false);
                    throw err;
                },
            });
    }

    private doReportGeneration(res: Blob | MediaSource): Window | null {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(res);
        link.download = `${this.selectedRow?.description || 'dashboard'}.xlsx`;
        link.click();
        setTimeout(() => window.URL.revokeObjectURL(link.href), 5000);
        return null;
    }

    private doReportGenerationCsv(res: Blob | MediaSource): Window | null {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(res);
        link.download = `${this.selectedRow?.description || 'dashboard'}.csv`;
        link.click();
        setTimeout(() => window.URL.revokeObjectURL(link.href), 5000);
        return null;
    }

    public json() {
        const from = this.langSrv.formatDate(this.fromDate.value);
        const to = this.langSrv.formatDate(this.toDate.value);
        const consolidated = this.consolidated.value;
        this.dashboardSrv
            .getJson(
                this.selected,
                this.detailPagination.page,
                this.detailPagination.pageSize,
                from,
                to,
                this.selectedAgentId,
                consolidated,
            )
            .subscribe((blob) => {
                if (blob && blob.size > 100) {
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = this.entitySrv.constructor.name + '.txt';
                    link.click();
                    setTimeout(
                        () => window.URL.revokeObjectURL(link.href),
                        5000,
                    );
                }
            });
    }

    private chartData(): ChartConfiguration {
        return {
            type: 'bar',
            data: {
                labels: this.dashboardData.map((a) => a[0]?.toString()),
                datasets: [
                    {
                        label: this.selectedRow?.description || '',
                        data: this.dashboardData.map((a) =>
                            this.asNumber(a[1]),
                        ),
                        backgroundColor: ['blue'],
                        borderColor: ['blue'],
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            boxHeight: 32,
                            color: 'blue',
                        },
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: this.data
                                .filter((e) => e.id === this.selected)
                                .map((e) => e.description)[0],
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 45,
                        },
                    },
                },
            },
        };
    }

    asNumber(s: string | number): number {
        if (s == null) {
            return 0;
        }
        if (typeof s === 'number') {
            return s;
        }
        const str = String(s).trim();
        if (str.length === 0) {
            return 0;
        }

        const lastDot = str.lastIndexOf('.');
        const lastComma = str.lastIndexOf(',');

        let normalized: string;
        if (lastComma > lastDot) {
            // comma likely decimal separator -> remove dots (thousands), convert comma to dot
            normalized = str.replace(/\./g, '').replace(',', '.');
        } else {
            // dot likely decimal separator -> remove commas (thousands)
            normalized = str.replace(/,/g, '');
        }

        // keep digits, dot and leading minus
        normalized = normalized.replace(/[^0-9.\-]/g, '');

        const parsed = parseFloat(normalized);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    public getPage() {
        return this.dashboardSrv.getCenterPage(this.pagination, this.filter);
    }

    private loadData() {
        const id = this.selected || 0;
        const from = dateToYmdStr(this.fromDate.value);
        const to = dateToYmdStr(this.toDate.value);
        const consolidated = this.consolidated.value;
        this.dashboardSrv
            .getData(
                id,
                this.detailPagination.page,
                this.detailPagination.pageSize,
                from,
                to,
                this.selectedAgentId,
                consolidated,
                this.filterCtrl.value,
            )
            .subscribe({
                next: (res) => {
                    this.dashboardData = res.body;
                    this.detailPagination.elementCount = res.itemCount;
                    this.chartComponent?.destroy();
                    if (res.itemCount < 50 && res.itemCount > 0) {
                        const ctx = <ChartItem>document.getElementById('chart');
                        const data = this.chartData();
                        this.chartComponent = new Chart(ctx, data);
                    }
                    this.smallData.set(res.itemCount <= 50);
                    this.validData.set(res.itemCount > 0);
                    this.shellSrv.setLoading(false);
                },
                error: (err) => {
                    throw err;
                },
            });
    }

    sort(event: Sort) {
        const columnIndex = this.headers.indexOf(event.active) + 1;

        event.active = columnIndex + '';
        this.dashboardSrv.sortColumn = event;
        this.loadData();
    }

    override canShowProcessingStatus() {
        return false;
    }
}
