import {Component, OnInit,} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaginationModel} from '@ss/common/api-common';
import {switchMap} from 'rxjs/operators';
import {Commission, CurrencyDepositService} from '@ss/exchange/api-currency-deposit';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'ss-commissions',
    styleUrls: ['./commission.component.scss'],
    templateUrl: './commission.component.html',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, DecimalPipe]
})
export class CommissionComponent implements OnInit {

    agentId = 0;
    data: Commission[] = [];

    public readonly pagination = PaginationModel.newInstance();

    displayedColumns = [
        'currency',
        'description',
        'withdrawal',
        'commission',
        'rate'
    ];


    constructor(public exchangeSrv: CurrencyDepositService, public  route: ActivatedRoute) {}


    ngOnInit() {
        this.pagination.pageSize = 5;
        this.route
            .queryParams
            .pipe(switchMap((params: any) => {
                this.agentId = +params.id || 0;
                return this.exchangeSrv.getCommissions(this.agentId, this.pagination.page - 1, this.pagination.pageSize);
            })).subscribe( res => this.data = res);
    }
}
