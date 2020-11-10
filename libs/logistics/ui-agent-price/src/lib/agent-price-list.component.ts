import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {AgentPrice, AgentPriceService} from "@ss/logistics/api-agent-price";

@Component({
    selector: 'ss-agent-price-list',
    styleUrls: ['./agent-price-list.component.scss'],
    templateUrl: './agent-price-list.component.html'
})
export class AgentPriceListComponent extends BaseEntityListComponent<AgentPrice> {


    displayedColumns = [
        'description',
        'descriptionAr'
    ];


    constructor(
        public agentPriceSrv: AgentPriceService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService) {
        super(agentPriceSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'LOGISTICS_AGENT_PRICE');
    }

    public ngOnInit() {
        this.shellSrv.setTilte(this.title);
        this.shellSrv.setGoBackPath('../..', this.route);
        this.shellSrv.enableSearch('COMMON_SEARCH', o => o.subscribe(f => this.setFilter(f)));
        this.shellSrv.setButtons([this.refreshButton, this.editButton]);
        this.pagination.onChange = () => this.refresh();
        this.refresh();
    }

}
