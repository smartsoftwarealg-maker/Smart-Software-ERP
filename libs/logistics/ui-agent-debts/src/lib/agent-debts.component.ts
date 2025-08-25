import {Component, inject, OnInit,} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaginationModel} from '@ss/common/api-common';
import {AgentDebts, AgentDebtsService} from '@ss/logistics/api-agent-debts';
import {HttpParams} from '@angular/common/http';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'ss-agent-debts',
    styleUrls: ['./agent-debts.component.scss'],
    templateUrl: './agent-debts.component.html',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, DecimalPipe]
})
export class AgentDebtsComponent implements OnInit {
    private route = inject( ActivatedRoute);
    private agentDebtsSrv = inject(AgentDebtsService);

    public readonly pagination = PaginationModel.newInstance();


    data: AgentDebts[];

    displayedColumns = [
        'document',
        'debit',
        'credit'
    ];


    ngOnInit() {
        this.pagination.onChange = () => this.refresh();
        this.route.queryParams.subscribe(param => {
            const agentId = +param['agentId']||0;
            this.agentDebtsSrv.setParentId(agentId);
            this.refresh();
        });
    }

    private refresh() {
        const params = new HttpParams()
            .set('compensated', true)
            .set('offset', this.pagination.page - 1)
            .set('limit', this.pagination.pageSize);
        this.agentDebtsSrv
            .getPage(this.pagination, null, null, params)
            .subscribe((x: AgentDebts[]) => this.data = x);
    }
}
