import {Component, Input, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel} from '@ss/common/api-common';
import {AgentDebts, AgentDebtsService} from '@ss/logistics/api-agent-debts';
import {HttpParams} from '@angular/common/http';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '../../../../common/ui-lang/src/lib/translate.directive';
import { PaginationComponent } from '../../../../common/ui-pagination/src/lib/pagination.component';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'ss-agent-debts',
    styleUrls: ['./agent-debts.component.scss'],
    templateUrl: './agent-debts.component.html',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, DecimalPipe]
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
