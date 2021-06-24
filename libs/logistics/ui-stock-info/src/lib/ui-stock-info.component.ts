import { Component, OnInit } from '@angular/core';
import {PaginationModel} from '@ss/common/api-common';
import {Circulation, CirculationService} from "@ss/logistics/api-circulation";
import {SnackBarService} from "@ss/common/ui-shell";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "@ss/stock/api-article";
import {LanguageService} from '@ss/common/api-common';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {StockInfoService} from "../../stock-info.service";
import {Observable} from "rxjs";
import {StockInfo} from "./stock-info";

@Component({
  selector: 'ss-order-lines-detail',
  templateUrl: './ui-stock-info.component.html',
  styleUrls: ['./ui-stock-info.component.scss']
})
export class UiStockInfoComponent implements OnInit {
    public readonly pagination = PaginationModel.newInstance();
    public data: StockInfo[] = [];
    articleReference: string;

    displayedColumns = [
        "store",
        "stock",
        "price1",
        "price2",
        "price3"
    ];

  constructor(public stockSrv: StockInfoService,
              public snackBarSrv: SnackBarService,
              public route: ActivatedRoute,
              public router: Router,
              public langServ: LanguageService) { }

    ngOnInit() {
        this.route.queryParams.subscribe(x => {
            this.articleReference = x.articleReference;
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
