import {Component} from '@angular/core';
import {DashboardService} from '../dashboard.service';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Dashboard} from '../dashboard';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {Observable, of, switchMap, tap} from 'rxjs';
import {
    APP_ASSET,
    APP_DASHBOARD, APP_HR, APP_PAYROLL,
    APP_PURCHASE, APP_SALES, APP_STOCK, getApplicationId,
    LanguageService,
    PaginationModel,
    PaginatorPersistenceService
} from '@ss/common/api-common';
import {FormControl, UntypedFormControl} from '@angular/forms';
import {AgentLookupModel, AgentService} from '@ss/logistics/api-agent';
import {Id} from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseEntityListComponent<Dashboard> {
    headers: string[] = ['test'];
    dashboardData: any[][] = [['test']];
    queries: string[] = [];
    detailPagination = PaginationModel.newInstance();
    time = new Date().getTime();
    toDate              = new UntypedFormControl(new Date());
    fromDate            = new UntypedFormControl(new Date(this.time - 365 * 24 * 3600 * 1000));
    consolidated        = new FormControl<boolean>(false);
    agentLookup         = new AgentLookupModel(this.agentSrv);
    tableWidth          = '1000';
    selectedAgentId: Id = '';

    constructor(public dashboardSrv: DashboardService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override confirmationSrv: ConfirmationDialogService,
                public override defReportSrv: DefaultReportService,
                public lookupsSrv: LookupsService,
                private agentSrv: AgentService,
                private langSrv: LanguageService,
                public override pagPersistSrv: PaginatorPersistenceService) {
        super(dashboardSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_DASHBOARD_QUERIES');
        this.detailPagination.onChange = () => this.updatePage();
        this.agentLookup.onValueChanged = (id: Id) => this.selectedAgentId = id;
    }

    override ngOnInit() {
        if (!this.dashboardSrv.getParentId()) {
            this.dashboardSrv.setParentId(1);
        }
        super.ngOnInit();
        this.editButton.visible = false;
        this.addButton.visible = false;
        this.deleteButton.visible = false;
    }

    override select(id: number) {
        super.select(id);
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
                        this.shellSrv.setLoading(false);
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

    override preload(): Observable<any> {
        this.dashboardSrv.setParentId(getApplicationId(this.router));
        return super.preload();
    }

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
}
