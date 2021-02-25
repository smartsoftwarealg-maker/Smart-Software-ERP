import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {PaginationModel} from "@ss/common/ui-pagination";
import {AgentDebts, AgentDebtsService} from "@ss/logistics/api-agent-debts";

@Component({
    selector: 'ss-agent-debts',
    styleUrls: ['./agent-debts.component.scss'],
    templateUrl: './agent-debts.component.html'
})
export class AgentDebtsComponent implements OnInit{



    public readonly pagination = PaginationModel.newInstance();


    data: AgentDebts[];

    displayedColumns = [
        "description"
    ];


    constructor(public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public agentDebtsService: AgentDebtsService,
                public confirmationSrv: ConfirmationDialogService) {
    }


    ngOnInit() {
        this.route.queryParams.subscribe(param => {
            const agentId = +param.agentId;

            if (agentId) {
                this.agentDebtsService.setParentId(agentId);
                this.loadAgentDebts();
            }

        });
    }

    loadAgentDebts() {
        this.agentDebtsService.getPage(this.pagination)
            .subscribe((x: AgentDebts[]) => this.data = x);
    }
}
