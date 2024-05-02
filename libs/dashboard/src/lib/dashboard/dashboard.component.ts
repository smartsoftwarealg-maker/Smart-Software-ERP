import { Component, inject, signal } from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Dashboard} from '../dashboard';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { Lookup, LookupsService } from "@ss/common/api-lookup";
import {switchMap, tap} from 'rxjs';
import {
    APP_ASSET,
    APP_DASHBOARD,
    APP_HR,
    APP_LTM,
    APP_PAYROLL,
    APP_PURCHASE,
    APP_SALES,
    APP_STOCK,
    APP_TREASURY,
    getApplicationId,
    LanguageService, MaterialModule,
    PaginationModel,
    PaginatorPersistenceService
} from '@ss/common/api-common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {AgentLookupModel, AgentService} from '@ss/logistics/api-agent';
import { CommonUiAutoCompleteModule, Id } from '@ss/common/ui-auto-complete';
import { Chart, ChartConfiguration, ChartItem, registerables } from "chart.js";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
})
export class DashboardComponent extends BaseEntityListComponent<Dashboard> {
    private agentSrv = inject(AgentService);
    private langSrv = inject(LanguageService);
    private chartComponent: Chart | null = null;

    // private jsonButton: ToolbarButton = {
    //     icon:  'fa-solid fa-coffee-bean',
    //     label: 'COMMON_JSON_EXPORT',
    //     disabled: false,
    //     visible: true,
    //     keepOnToolbar: KeepOnToolbar.DYNAMIC,
    //     click: () => this.json()
    // };
    APPLICATIONS: Lookup[] = [{ id: APP_DASHBOARD, description: 'DASHBOARD' },
        { id: APP_PURCHASE,  description: 'PURCHASES' },
        { id: APP_STOCK,     description: 'STOCK'     },
        { id: APP_SALES,     description: 'SALES'     },
        { id: APP_PAYROLL,   description: 'PAYROLL'   },
        { id: APP_HR,        description: 'HR'        },
        { id: APP_ASSET,     description: 'ASSETS'    },
        { id: APP_TREASURY,  description: 'TREASURY'  },
        { id: APP_LTM,       description: 'LTM'  },
    ];

    showApplications = signal(false);
    headers: string[] = ['test'];
    dashboardData: any[][] = [['test']];
    detailPagination = PaginationModel.newInstance();
    time = new Date().getTime();
    application = new FormControl<number>(1);
    toDate              = new FormControl(new Date());
    fromDate            = new FormControl(new Date(this.time - 365 * 24 * 3600 * 1000));
    consolidated     = new FormControl<boolean>(false);
    agentLookup         = new AgentLookupModel(this.agentSrv);
    tableWidth          = '1000';
    selectedAgentId: Id = '';
    processing = false;
    light = true;
    smallData = signal(false);
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
    }

    override select(id: number) {
        this.smallData.set(false);
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
                        consolidated)))
                .subscribe({
                    next: res => {
                        this.dashboardData = res.body;
                        this.detailPagination.elementCount = res.itemCount;
                        this.chartComponent?.destroy();
                        if (this.dashboardData.length < 14 && this.dashboardData.length > 0) {
                            const ctx = <ChartItem>document.getElementById('chart');
                            this.chartComponent = new Chart(ctx, this.chartData());
                        }
                        this.shellSrv.setLoading(false);
                        this.smallData.set(this.dashboardData.length < 14 && this.dashboardData.length > 0);
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
            .getData(this.selected, this.detailPagination.page, this.detailPagination.pageSize, from, to, this.selectedAgentId)
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
                        data: this.dashboardData.map(a => this.langSrv.parseNumber(a[1])),
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

    public getPage() {
        return this.dashboardSrv.getCenterPage(this.pagination, this.filter);
    }
}
