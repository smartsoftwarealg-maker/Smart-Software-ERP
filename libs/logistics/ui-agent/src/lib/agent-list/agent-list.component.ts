import { Component, inject } from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {LookupsService} from '@ss/common/api-lookup';
import {Observable, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import { Agent, AGENT_URL, AgentService, CUSTOMER_URL } from '@ss/logistics/api-agent';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {IsParamService, PaginatorPersistenceService} from '@ss/common/api-common';

//import {BaseEntityListComponent} from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-agent-list',
    styleUrls: ['./agent-list.component.scss'],
    templateUrl: './agent-list.component.html'
})
export class AgentListComponent extends BaseEntityListComponent<Agent> {
    private isParamSrv = inject(IsParamService);

    private isAQS       = false;
    private DEF_COLUMNS = [
        'customerCode',
        'denomination',
        'typeDescription',
        'address'
    ];

    private AQS_COLUMNS = [
        'customerCode',
        'denomination',
        'typeDescription',
        'address',
        'activityDescription',
        'departmentName',
    ];

    isSales = false;
    isAsset = false;


    displayedColumns = this.DEF_COLUMNS;

    constructor(
        public agentService: AgentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(agentService, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'COMMON_AGENTS');
        this.pagination.pageSize = this.isSales? 10 : 15;
        this.isSales = this.route.snapshot?.data['sales']  || false;
        this.isAsset = this.route.snapshot?.data['assets'] || false;
    }

    override preload(): Observable<any> {
        return this.isParamSrv
            .is('AQS')
            .pipe(tap((b: boolean) => {
                this.isAQS = b;
                this.displayedColumns = this.isAQS ? this.AQS_COLUMNS : this.DEF_COLUMNS;
            }),
            switchMap(() => this.route.data),
            tap(res => {
                if (res['customer']) {
                    this.agentService.setURL(CUSTOMER_URL);
                    this.shellSrv.setTitle('LOGISTICS_CUSTOMER');
                } else {
                    this.agentService.setURL(AGENT_URL);
                }
            }));
    }
}
