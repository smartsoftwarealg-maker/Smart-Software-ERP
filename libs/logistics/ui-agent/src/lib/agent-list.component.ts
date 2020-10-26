import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentService, Agent} from '@ss/logistics/api-agent';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {LookupsService} from "@ss/common/api-lookup";

@Component({
    selector: 'ss-article-list',
    styleUrls: ['./article-list.component.scss'],
    templateUrl: './article-list.component.html'
})
export class AgentListComponent extends BaseEntityListComponent<Agent> {

    displayedColumns = [
        'customerCode',
        'denomination',
        'fiscalID',
        'articleNo'
    ];


    constructor(
        public agentService: AgentService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupsSrv: LookupsService) {
        super(agentService, shellSrv, snackBarSrv, route, router, 'STOCK_ARTICLES');
    }


}
