import {Injectable} from '@angular/core';
import {Article, ARTICLE_IMAGE_URL, ARTICLES_URL, AvailableStock, QtyPrice} from './article-api';
import {Observable, of} from 'rxjs';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {HttpParams} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ArticleService extends BaseEntityExtendedService<Article> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ARTICLES_URL);
    }

    getPPrice(ref: string, storeId: number, transacId: number, id: number): Observable<QtyPrice> {
        if (ref == null) {
            return of({ document: 0, qty: 0, price: 0});
        }
        const url = `/pprice?find=${ref}&storeId=${storeId}&transacId=${transacId}&id=${id}`;
        return this.httpSrv.get<QtyPrice>(url);
    }

    public getPhotoUrl(id: number): string {
        return id != null && id > 0 ? (ARTICLES_URL + '/' + id + ARTICLE_IMAGE_URL) : null;
    }

    setUrl(url: string) {
        this.url = url;
    }

    override get(iid: number | string): Observable<Article> {
        return super.get(iid);
    }

    availableStock(klass?: number, searchText?: string): Observable<AvailableStock[]> {
        const params = new HttpParams();
        const p1 = klass? params.set('klass', klass) : params;
        const p2 = searchText? p1.set('filter', searchText) : p1;
        // const params = searchText? new HttpParams().set('filter', searchText) : null;
        return this.httpSrv.get<AvailableStock[]>('/articles/available-stock', p2);
    }

    init(): Observable<boolean> {
        return this.httpSrv.init();
    }
}
