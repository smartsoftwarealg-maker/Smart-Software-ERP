import {Injectable} from '@angular/core';
import {PaginationModel} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {ARTICLES_URL} from '@ss/master-data/api-article';
import {HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TOTAL_STOCK_URL, TotalStock} from '../total-stock';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class TotalStockService extends BaseEntityService<TotalStock> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TOTAL_STOCK_URL, ARTICLES_URL);
    }

    load(paginator: PaginationModel, filter: string | null, sortBy: string | null, reference: string): Observable<TotalStock[]> {
        return this.httpSrv.getData<TotalStock>(`${ARTICLES_URL}${TOTAL_STOCK_URL}`,
            paginator.page - 1,
            paginator.pageSize,
            filter,
            sortBy,
            new HttpParams().set('reference', reference))
            .pipe(map((data: { itemCount: number, body: TotalStock[] }) => {
                    paginator.elementCount = data.itemCount;
                    return data.body;
                })
            );
    }
}
