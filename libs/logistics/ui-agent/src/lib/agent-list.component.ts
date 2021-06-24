import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentType, LookupsService} from '@ss/common/api-lookup';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
//import {BaseEntityListComponent} from '@ss/common/api-base-entity';

@Component({
    selector: 'ss-agent-list',
    styleUrls: ['./agent-list.component.scss'],
    templateUrl: './agent-list.component.html'
})
export class AgentListComponent extends BaseEntityListComponent<Agent> {

    agentTypes: { [id: number]: string; };

    displayedColumns = [
        'customerCode',
        'denomination',
        'agentType',
        'address'
    ];

    preload(): Observable<any> {
        return this.lookupsSrv.getAgentTypes()
            .pipe(
                tap(x => this.onAgentTypesLoaded(x))
            );
    }


    constructor(
        public agentService: AgentService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService) {
        super(agentService, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'LOGISTICS_AGENTS');
    }


    private onAgentTypesLoaded(data: AgentType[]) {
        this.agentTypes = data.reduce(
            (total, currentValue) => {
                total[currentValue.id] = currentValue.description;
                return total
            }, {}
        );
    }
}
