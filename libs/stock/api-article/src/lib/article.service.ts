import {Injectable} from '@angular/core';
import {Article, ARTICLES_URL} from './article-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Observable, of} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ArticleService extends BaseEntityExtendedService<Article> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, ARTICLES_URL);
    }

    getPPrice(ref: string, storeId: number, transacId: number): Observable<{ price: number }> {
        if (ref == null) {
            return of({ price: 0.0});
        }
        const url = `/pprice?find=${ref}&storeId=${storeId}&transacId=${transacId}`;
        return this.httpSrv.get<{ price: number }>(url);
    }
}
