import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {ARTICLES_URL} from "@ss/stock/api-article";
import {ARTICLE_STORE_URL, ArticleStore} from "./article-store-api";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ArticleStoreService extends BaseEntityExtendedService<ArticleStore> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, ARTICLE_STORE_URL, ARTICLES_URL);
    }


    get(id: number): Observable<ArticleStore> {
        return this.httpSrv.get('/lots' + '/' + id);
    }
}
