import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Card, CardService} from '@ss/logistics/api-card';
import {ArticleService} from '@ss/stock/api-article';
import {PaginationModel} from '@ss/common/ui-pagination';
import {LanguageService} from '@ss/common/ui-lang';
import {ArticleLotsService} from '@ss/stock/api-article-store';
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


    constructor(public exchangeSrv: CurrencyDepositService, public route: ActivatedRoute) {}


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
