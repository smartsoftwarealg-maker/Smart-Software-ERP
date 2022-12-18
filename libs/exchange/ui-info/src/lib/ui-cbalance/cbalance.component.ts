import {Component, OnInit,} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaginationModel} from '@ss/common/api-common';
import {switchMap} from 'rxjs/operators';
import {Balance, CBalance, CurrencyDepositService} from '@ss/exchange/api-currency-deposit';

@Component({
    selector: 'ss-cbalance',
    styleUrls: ['./cbalance.component.scss'],
    templateUrl: './cbalance.component.html'
})
export class CbalanceComponent implements OnInit {
    agentId = 0;
    data: CBalance[] = [];

    public readonly pagination = PaginationModel.newInstance();

    displayedColumns = [
        'currency',
        'amount',
    ];


    constructor(public exchangeSrv: CurrencyDepositService, public override route: ActivatedRoute) {}


    ngOnInit() {
        this.pagination.pageSize = 5;
        this.route
            .queryParams
            .pipe(switchMap(params => {
                this.agentId = +params.id || 0;
                return this.exchangeSrv.getCBalance(this.agentId, this.pagination.page - 1, this.pagination.pageSize);
            })).subscribe( res => this.data = res);
    }
}
