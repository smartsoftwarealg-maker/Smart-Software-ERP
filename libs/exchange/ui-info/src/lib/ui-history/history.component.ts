import {Component, OnInit,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginationModel} from '@ss/common/api-common';
import {switchMap} from 'rxjs/operators';
import {CurrencyDepositService} from '@ss/exchange/api-currency-deposit';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';
import { DecimalPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'ss-history',
    styleUrls: ['./history.component.scss'],
    templateUrl: './history.component.html',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, DecimalPipe, DatePipe]
})
export class HistoryComponent implements OnInit {

    agentId = 0;
    data: History[] = [];

    public readonly pagination = PaginationModel.newInstance();

    displayedColumns = [
        'customer',
        'excDate',
        'excType',
        'description',
        'credit',
        'debit',
        'currency',
    ];


    constructor(public exchangeSrv: CurrencyDepositService, public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.pagination.pageSize = 5;
        this.pagination.onChange = () => this.refresh();
        this.refresh();
    }

    refresh() {
        this.route
            .queryParams
            .pipe(switchMap(params => {
                this.agentId = +params.id || 0;
                return this.exchangeSrv.getHistory(this.agentId, this.pagination.page - 1, this.pagination.pageSize);
            })).subscribe( res => {
            this.data = res.body;
            this.pagination.elementCount = res.itemCount;
        });
    }
}
