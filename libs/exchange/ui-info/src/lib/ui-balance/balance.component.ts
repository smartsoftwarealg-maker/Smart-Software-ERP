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
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'ss-balance',
    styleUrls: ['./balance.component.scss'],
    templateUrl: './balance.component.html',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, DecimalPipe]
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
