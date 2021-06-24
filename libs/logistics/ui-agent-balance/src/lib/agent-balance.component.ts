import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {PaginationModel} from '@ss/common/api-common';
import {AgentBalance, AgentBalanceService} from "@ss/logistics/api-agent-balance";

@Component({
    selector: 'ss-agent-balance',
    styleUrls: ['./agent-balance.component.scss'],
    templateUrl: './agent-balance.component.html'
})
export class AgentBalanceComponent implements OnInit {


    public readonly pagination = PaginationModel.newInstance();


    data: AgentBalance[];

    displayedColumns = [
        "document",
        "debit",
        "credit"
    ];


    constructor(public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public agentBalanceService: AgentBalanceService,
                public confirmationSrv: ConfirmationDialogService) {
    }


    ngOnInit() {
        this.route.queryParams.subscribe(param => {
            const agentId = +param.agentId;

            if (agentId) {
                this.agentBalanceService.setParentId(agentId);
                this.loadAgentBalance();
            }

        });
    }

    loadAgentBalance() {
        this.agentBalanceService.getPage(this.pagination)
            .subscribe((x: AgentBalance[]) => this.data = x);
    }
}
