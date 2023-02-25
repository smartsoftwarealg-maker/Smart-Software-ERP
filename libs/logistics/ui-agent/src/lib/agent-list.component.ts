import {Component, ElementRef, ViewChild,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentType, LookupsService} from '@ss/common/api-lookup';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {DocInfoComponent} from '@ss/logistics/ui-doc-info';
//import {BaseEntityListComponent} from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-agent-list',
    styleUrls: ['./agent-list.component.scss'],
    templateUrl: './agent-list.component.html'
})
export class AgentListComponent extends BaseEntityListComponent<Agent> {
    isSales = this.route.snapshot.data['sales'] || false;
    agentTypes: { [id: number]: string; };

    displayedColumns = [
        'customerCode',
        'denomination',
        'agentType',
        'address'
    ];


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
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getAgentTypes().pipe(tap(x => this.onAgentTypesLoaded(x)));
    }

    private onAgentTypesLoaded(data: AgentType[]) {
        this.agentTypes = data.reduce(
            (total: { [id: number]: string; }, currentValue) => {
                total[currentValue.id] = currentValue.description;
                return total
            }, {}
        );
    }
}
