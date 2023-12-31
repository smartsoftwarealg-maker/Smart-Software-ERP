import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Card, CardService} from '@ss/logistics/api-card';
import {ArticleService} from '@ss/master-data/api-article';
import {PaginationModel} from '@ss/common/api-common';
import {LanguageService} from '@ss/common/api-common';
import {ArticleLotsService} from '@ss/stock/api-article-store';
import {switchMap} from 'rxjs/operators';
import {Balance, CurrencyDepositService} from '@ss/exchange/api-currency-deposit';

@Component({
    selector: 'ss-balance',
    styleUrls: ['./balance.component.scss'],
    templateUrl: './balance.component.html'
})
export class BalanceComponent implements OnInit {
    agentId = 0;
    data: Balance[] = [];

    public readonly pagination = PaginationModel.newInstance();

    displayedColumns = [
        'currency',
        'credit',
        'debit',
        'balance',
    ];


    constructor(public exchangeSrv: CurrencyDepositService, public route: ActivatedRoute) {}


    ngOnInit() {
        this.pagination.pageSize = 5;
        this.route
            .queryParams
            .pipe(switchMap(params => {
                this.agentId = +params.id || 0;
                return this.exchangeSrv.getBalance(this.agentId, this.pagination.page - 1, this.pagination.pageSize);
            })).subscribe( res => this.data = res);
    }
}
