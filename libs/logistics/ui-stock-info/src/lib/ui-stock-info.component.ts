import { Component, inject, OnInit, signal } from '@angular/core';
import { LoginService, PaginationModel } from '@ss/common/api-common';
import {SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {LanguageService} from '@ss/common/api-common';
import {StockInfoService} from './services/stock-info.service';
import {StockInfo} from './stock-info';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow
} from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DecimalPipe } from '@angular/common';
import { OptionService } from '@ss/logistics/ui-options';

@Component({
    selector: 'ss-stock-info',
    templateUrl: './ui-stock-info.component.html',
    styleUrls: ['./ui-stock-info.component.scss'],
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, DecimalPipe]
})
export class UiStockInfoComponent implements OnInit {
    #loginSrv = inject(LoginService);
    #optionsSrv = inject(OptionService);

    readonly pagination = PaginationModel.newInstance();
    data: StockInfo[] = [];
    articleReference: string;
    usesLots = signal(false);

    displayedColumns = [
        'store',
        'lotNumber',
        'stock',
        'awp',
        'price1',
        'price2',
        'price3',
    ];

    constructor(public stockSrv: StockInfoService,
              public snackBarSrv: SnackBarService,
              public route: ActivatedRoute,
              public router: Router,
              public langServ: LanguageService) { }

    ngOnInit() {
        this.route.queryParams.subscribe(x => {
            this.articleReference = x['articleReference'];
            this.loadStockInfo();
        });

        this.pagination.onChange = () => this.loadStockInfo();
        this.#optionsSrv
            .get(this.#loginSrv.appCtx.center)
            .subscribe(res => {
                this.displayedColumns = this.displayedColumns.filter(c => res.usesLots || c !== 'store');
                this.usesLots.set(res.usesLots);
            });
    }

    loadStockInfo() {
        this.stockSrv
            .load(this.pagination, null, null, this.articleReference || '')
            .subscribe((x: StockInfo[]) =>  {
                this.data = x;
            });
    }
}
