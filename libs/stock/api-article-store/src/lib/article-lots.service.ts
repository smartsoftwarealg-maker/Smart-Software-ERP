import {Injectable} from '@angular/core';
import {ARTICLE_LOTS_URL, ArticleLot} from './article-store-api';
import {ARTICLES_URL} from '@ss/master-data/api-article';
import {Observable} from 'rxjs';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Lot} from '@ss/common/api-lookup';



@Injectable({
    providedIn: 'root'
})
export class ArticleLotsService extends BaseEntityExtendedService<Lot> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ARTICLE_LOTS_URL, ARTICLES_URL);
    }


    override get(id: number): Observable<Lot> {
        return this.httpSrv.get('/lots' + '/' + id);
    }
}
