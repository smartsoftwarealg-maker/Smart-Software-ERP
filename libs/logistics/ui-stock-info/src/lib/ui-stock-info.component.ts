import { Component, OnInit } from '@angular/core';
import {PaginationModel} from '@ss/common/api-common';
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

@Component({
    selector: 'ss-stock-info',
    templateUrl: './ui-stock-info.component.html',
    styleUrls: ['./ui-stock-info.component.scss'],
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, DecimalPipe]
})
export class UiStockInfoComponent implements OnInit {
    public readonly pagination = PaginationModel.newInstance();
    public data: StockInfo[] = [];
    articleReference: string;

    displayedColumns = [
        'store',
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
    }

    loadStockInfo() {
      this.stockSrv
          .load(this.pagination, null, null, this.articleReference || '')
          .subscribe((x: StockInfo[]) =>  {
              this.data = x;
          });
    }
}
