import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {ARTICLE_STORE_URL, ArticleStore} from './article-store-api';
import {ARTICLES_URL} from '@ss/master-data/api-article';


@Injectable({
    providedIn: 'root'
})
export class ArticleStoresService extends BaseEntityExtendedService<ArticleStore> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ARTICLE_STORE_URL, ARTICLES_URL);
    }
}
