import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel} from '@ss/common/api-common';
import {AgentBalance, AgentBalanceService} from '@ss/logistics/api-agent-balance';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '../../../../common/ui-lang/src/lib/translate.directive';
import { PaginationComponent } from '../../../../common/ui-pagination/src/lib/pagination.component';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'ss-agent-balance',
    styleUrls: ['./agent-balance.component.scss'],
    templateUrl: './agent-balance.component.html',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, DecimalPipe]
})
export class AgentBalanceComponent implements OnInit {


    public readonly pagination = PaginationModel.newInstance();


    data: AgentBalance[];

    displayedColumns = [
        'totalDebit',
        'totalCredit',
        'debit',
        'credit'
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
            const agentId = +param['agentId'];

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
