import { Component, DestroyRef, inject, signal } from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Dashboard} from '../dashboard';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { LookupsService } from "@ss/common/api-lookup";
import {switchMap, tap} from 'rxjs';
import {
    APP_DASHBOARD,
    APPLICATIONS,
    getApplicationId,
    LanguageService, MaterialModule,
    PaginationModel,
    PaginatorPersistenceService
} from '@ss/common/api-common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {AgentLookupModel, AgentService} from '@ss/logistics/api-agent';
import { Id, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { Chart, ChartConfiguration, ChartItem, registerables } from "chart.js";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
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
        UiAutoCompleteComponent
    ]
})
export class DashboardComponent extends BaseEntityListComponent<Dashboard> {
    #destroyRef = inject(DestroyRef);
    #accessRightsSrv = inject(AccessRightsService);
    private agentSrv = inject(AgentService);
    private langSrv = inject(LanguageService);
    private chartComponent: Chart | null = null;


    applications = signal(APPLICATIONS);
    showApplications = signal(false);
    headers: string[] = ['test'];
    dashboardData: any[][] = [['test']];
    detailPagination = PaginationModel.newInstance({page: 1, pageSize: 50, elementCount: 0});
    time = new Date().getTime();
    application = new FormControl<number>(1);
    filterCtrl         = new FormControl<string>('');
    toDate              = new FormControl(new Date());
    fromDate            = new FormControl(new Date(this.time - 365 * 24 * 3600 * 1000));
    consolidated     = new FormControl<boolean>(false);
    agentLookup         = new AgentLookupModel(this.agentSrv);
    tableWidth          = '1000';
    selectedAgentId: Id = '';
    processing = false;
    light = true;
    smallData = signal(true);
    validData = signal(false);

    constructor(public dashboardSrv: DashboardService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override confirmationSrv: ConfirmationDialogService,
                public override defReportSrv: DefaultReportService,
                public lookupsSrv: LookupsService,
                public override pagPersistSrv: PaginatorPersistenceService) {
        super(dashboardSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_DASHBOARD_QUERIES');
        this.detailPagination.onChange = () => this.updatePage();
        this.agentLookup.onValueChanged = (id: Id) => this.selectedAgentId = id;
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
        this.subscriptions.push(this.application
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(id => {
                this.dashboardSrv.setParentId(id);
                this.refresh();
            }));

        // this.shellSrv.addButton(this.jsonButton);
        this.#accessRightsSrv
            .getApps()
            .subscribe(res => this.applications.update(apps => apps.filter(kv => res.apps.indexOf(kv.description) > -1)));
    }

    override select(id: number) {
        this.validData.set(false);
        super.select(id || getApplicationId(this.router));
        this.headers = [];
        this.dashboardData = [];
        const from = this.langSrv.formatDate(this.fromDate.value);
        const to = this.langSrv.formatDate(this.toDate.value);
        const consolidated = this.consolidated.value;
        if (id) {
            this.shellSrv.setLoading(true);
            this.dashboardSrv
                .getHeaders(id)
                .pipe(tap(res => {
                        this.headers = res.headers;
                        this.tableWidth = (res.headers.length * 100) + '';
                    }),
                    switchMap(_ => this.dashboardSrv.getData(
                        id,
                        this.detailPagination.page,
                        this.detailPagination.pageSize,
                        from,
                        to,
                        this.selectedAgentId,
                        consolidated,
                        this.filterCtrl.value)))
                .subscribe({
                    next: res => {
                        this.dashboardData = res.body;
                        this.detailPagination.elementCount = res.itemCount;
                        this.chartComponent?.destroy();
                        if (this.dashboardData.length < 50 && this.dashboardData.length > 0) {
                            const ctx = <ChartItem>document.getElementById('chart');
                            this.chartComponent = new Chart(ctx, this.chartData());
                        }
                        this.shellSrv.setLoading(false);
                        this.smallData.set(this.detailPagination.elementCount < 50);
                        this.validData.set(this.dashboardData.length > 0);
                    },
                    error: err => {
                        this.shellSrv.setLoading(false);
                        throw err;
                    }
                });
        }
    }

    private updatePage() {
        const from = this.langSrv.formatDate(this.fromDate.value);
        const to = this.langSrv.formatDate(this.toDate.value);
        this.shellSrv.setLoading(true);
        this.dashboardSrv
            .getData(this.selected, this.detailPagination.page, this.detailPagination.pageSize, from, to, this.selectedAgentId, this.consolidated.value, this.filterCtrl.value)
            .subscribe({
                next: res => {
                    this.dashboardData = res.body;
                    this.detailPagination.elementCount = res.itemCount;
                    this.shellSrv.setLoading(false);
                }, error: err => {
                    this.shellSrv.setLoading(false);
                    throw err;
                }
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
        this.dashboardSrv
            .getExcel(this.selected, this.detailPagination.page, this.detailPagination.pageSize, from, to, this.selectedAgentId, consolidated)
            .subscribe(blob => {
                // saveAs(blob, this.entitySrv.constructor.name + '.xlsx');
                if (blob && blob.size > 100) {
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = this.entitySrv.constructor.name + '.xlsx';
                    link.click();
                    setTimeout(() => window.URL.revokeObjectURL(link.href), 5000);
                }
            });
    }

    public json() {
        const from = this.langSrv.formatDate(this.fromDate.value);
        const to = this.langSrv.formatDate(this.toDate.value);
        const consolidated = this.consolidated.value;
        this.dashboardSrv
            .getJson(this.selected, this.detailPagination.page, this.detailPagination.pageSize, from, to, this.selectedAgentId, consolidated)
            .subscribe(blob => {
                if (blob && blob.size > 100) {
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = this.entitySrv.constructor.name + '.txt';
                    link.click();
                    setTimeout(() => window.URL.revokeObjectURL(link.href), 5000);
                }
            });
    }

    private chartData(): ChartConfiguration {
        return {
            type: 'bar' ,
            data: {
                labels: this.dashboardData.map(a => a[0]?.toString()),
                datasets: [
                    {
                        label: this.selectedRow?.description || '',
                        data: this.dashboardData.map(a => this.asNumber(a[1])),
                        backgroundColor: ['blue'],
                        borderColor: ['blue']
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            boxHeight: 32,
                            color: 'blue'
                        },
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: this.data.filter(e => e.id === this.selected).map(e => e.description)[0]
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 45
                        }

                    }
                }
            }
        };
    }

    asNumber(s: string|number): number {
        if (typeof s === 'string') {
            const regEx = new RegExp(/[^\d.]/g);
            return +(s.indexOf(".") > 0? s : s.replaceAll(',', '.')).replaceAll(regEx, '');
        } else {
            return s;
        }
    }
    public getPage() {
        return this.dashboardSrv.getCenterPage(this.pagination, this.filter);
    }

    sort(event: Sort) {
        const columnIndex = this.headers.indexOf(event.active) + 1;

        event.active = columnIndex + '';
        this.dashboardSrv.sortColumn = event;
        const id = this.selected || 0;
        const from = this.langSrv.formatDate(this.fromDate.value);
        const to = this.langSrv.formatDate(this.toDate.value);
        const consolidated = this.consolidated.value;

        this.dashboardSrv.getData(
                    id,
                    this.detailPagination.page,
                    this.detailPagination.pageSize,
                    from,
                    to,
                    this.selectedAgentId,
                    consolidated,
                    this.filterCtrl.value)
            .subscribe({
                next: res => {
                    this.dashboardData = res.body;
                    this.detailPagination.elementCount = res.itemCount;
                    this.chartComponent?.destroy();
                    if (res.itemCount < 50) {
                        const ctx = <ChartItem>document.getElementById('chart');
                        this.chartComponent = new Chart(ctx, this.chartData());
                    }
                    this.smallData.set(this.detailPagination.elementCount < 50);
                    this.validData.set(this.dashboardData.length > 0);
                },
                error: err => {
                    throw err;
                }
            });
    }


    override canShowProcessingStatus() {
        return false;
    }
}
