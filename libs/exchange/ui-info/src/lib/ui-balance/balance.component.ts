import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Card, CardService} from '@ss/logistics/api-card';
import {ArticleService} from '@ss/stock/api-article';
import {PaginationModel} from '@ss/common/ui-pagination';
import {LanguageService} from '@ss/common/ui-lang';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Lot} from '@ss/common/api-lookup';
import {FormControl, FormGroup} from '@angular/forms';
import {ArticleLotsService} from '@ss/stock/api-article-store';
import {Balance, CurrencyExchangeService, History} from '@ss/exchange/api-currency-exchange';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'ss-card',
    styleUrls: ['./balance.component.scss'],
    templateUrl: './balance.component.html'
})
export class BalanceComponent implements OnInit {
    agentId = 0;
    data: Balance[] = [];

    public readonly pagination = PaginationModel.newInstance();

    displayedColumns = [
        'currency',
        'debit',
        'credit'
    ];


    constructor(public exchangeSrv: CurrencyExchangeService,
                public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public articleSrv: ArticleService,
                public langServ: LanguageService,
                public storeSrv: ArticleLotsService,
                public confirmationSrv: ConfirmationDialogService) {
    }


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
