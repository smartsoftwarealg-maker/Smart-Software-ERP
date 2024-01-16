import {Injectable} from '@angular/core';
import {PaginationModel} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {ARTICLES_URL} from '@ss/master-data/api-article';
import {HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {STOCK_INFO_URL, StockInfo} from './src/lib/stock-info';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class StockInfoService extends BaseEntityService<StockInfo> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, STOCK_INFO_URL, ARTICLES_URL);
    }

    load(paginator: PaginationModel, filter: string | null, sortBy: string | null, reference: string): Observable<StockInfo[]> {
        return this.httpSrv.getData<StockInfo>(`${ARTICLES_URL}${STOCK_INFO_URL}`,
            paginator.page - 1,
            paginator.pageSize,
            filter,
            sortBy,
            new HttpParams().set('find', reference))
            .pipe(map((data: { itemCount: number, body: StockInfo[] }) => {
                    paginator.elementCount = data.itemCount;
                    return data.body;
                })
            );
    }
}
