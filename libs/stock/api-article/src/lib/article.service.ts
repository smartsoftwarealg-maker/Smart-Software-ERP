import {Injectable} from '@angular/core';
import {Article, ARTICLE_IMAGE_URL, ARTICLES_URL} from './article-api';
import {Observable, of} from 'rxjs';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';


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
    public getPhotoUrl(id: number): string {
        return id != null && id > 0 ? (ARTICLES_URL + '/' + id + ARTICLE_IMAGE_URL) : null;
    }
}
