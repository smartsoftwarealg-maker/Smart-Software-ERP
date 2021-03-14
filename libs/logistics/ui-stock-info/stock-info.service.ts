import { Injectable } from '@angular/core';
import {PaginationModel} from "@ss/common/ui-pagination";
import {Observable} from "rxjs";
import {Circulation, CIRCULATION_URL} from "@ss/logistics/api-circulation";
import {ARTICLES_URL} from "@ss/stock/api-article";
import {HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {BaseEntityService} from "@ss/common/api-base-entity";
import {STOCK_INFO_URL, StockInfo} from "./src/lib/stock-info";
import {HttpService} from "@ss/common/api-common";

@Injectable({
  providedIn: 'root'
})
export class StockInfoService extends BaseEntityService<StockInfo> {

  constructor(protected httpSrv: HttpService) {
      super(httpSrv, STOCK_INFO_URL, ARTICLES_URL);
  }

    load(paginator: PaginationModel, filter, sortBy, reference): Observable<StockInfo[]> {
        return this.httpSrv.getData(`${ARTICLES_URL}${STOCK_INFO_URL}`,
            paginator.page  - 1,
            paginator.pageSize,
            filter,
            sortBy,
            new HttpParams().set('find', reference)).pipe(
            map((data: { itemCount: number, body: StockInfo[] }) => {
                paginator.elementCount = data.itemCount;
                return data.body;
            })
        );
    }
}
