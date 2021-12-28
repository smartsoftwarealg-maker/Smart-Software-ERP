import {Component} from '@angular/core';
import {DashboardService} from '../dashboard.service';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Dashboard} from '../dashboard';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {LookupsService} from '@ss/common/api-lookup';
import {switchMap, tap} from 'rxjs';
import {LanguageService, PaginationModel, PaginatorPersistenceService} from '@ss/common/api-common';
import {FormControl} from '@angular/forms';
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
    toDate      = new FormControl(new Date());
    fromDate    = new FormControl(new Date(this.time - 365 * 24 * 3600 * 1000));
    agentLookup = new AgentLookupModel(this.agentSrv);
    selectedAgentId: Id = '';
    tableWidth = '1000';

    constructor(public dashboardSrv: DashboardService,
                public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public confirmationSrv: ConfirmationDialogService,
                public defReportSrv: DefaultReportService,
                public lookupsSrv: LookupsService,
                private agentSrv: AgentService,
                private langSrv: LanguageService,
                public pagPersistSrv: PaginatorPersistenceService) {
        super(dashboardSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_DASHBOARD_QUERIES');
        this.detailPagination.onChange = () => this.updatePage();
        this.agentLookup.onValueChanged = (id: Id) => this.selectedAgentId = id;
    }

    ngOnInit() {
        super.ngOnInit();
        this.editButton.visible = false;
        this.addButton.visible = false;
        this.deleteButton.visible = false;
    }

    select(id: number) {
        super.select(id);
        this.headers = [];
        this.dashboardData = [];
        const from = this.langSrv.formatDate(this.fromDate.value);
        const to = this.langSrv.formatDate(this.toDate.value);
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
                          this.selectedAgentId)))
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
}
