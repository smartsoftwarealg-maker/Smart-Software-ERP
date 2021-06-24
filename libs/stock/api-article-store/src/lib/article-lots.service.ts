import {Injectable} from '@angular/core';
import {ARTICLE_LOTS_URL, ArticleLot} from './article-store-api';
import {ARTICLES_URL} from '@ss/stock/api-article';
import {Observable} from 'rxjs';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';



@Injectable({
    providedIn: 'root'
})
export class ArticleLotsService extends BaseEntityExtendedService<ArticleLot> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, ARTICLE_LOTS_URL, ARTICLES_URL);
    }


    get(id: number): Observable<ArticleLot> {
        return this.httpSrv.get('/lots' + '/' + id);
    }
}
