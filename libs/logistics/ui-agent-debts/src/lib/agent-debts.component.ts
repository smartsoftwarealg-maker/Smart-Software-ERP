import {Component, Input, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel} from '@ss/common/api-common';
import {AgentDebts, AgentDebtsService} from '@ss/logistics/api-agent-debts';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'ss-agent-debts',
    styleUrls: ['./agent-debts.component.scss'],
    templateUrl: './agent-debts.component.html'
})
export class AgentDebtsComponent implements OnInit {
    public readonly pagination = PaginationModel.newInstance();


    data: AgentDebts[];

    displayedColumns = [
        'document',
        'debit',
        'credit'
    ];


    constructor(private shellSrv: ShellService,
                private snackBarSrv: SnackBarService,
                private route: ActivatedRoute,
                private router: Router,
                private agentDebtsSrv: AgentDebtsService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(param => {
            const agentId = +param['agentId'];
            const compensated = param['compensated'];
            const params = new HttpParams().set('compensated', compensated);
            if (agentId) {
                this.agentDebtsSrv.setParentId(agentId);
                this.agentDebtsSrv.getPage(this.pagination, null, null, params)
                    .subscribe((x: AgentDebts[]) => this.data = x);
            }
        });
    }
}
