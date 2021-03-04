import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {ARTICLES_URL} from "@ss/stock/api-article";
import {ARTICLE_LOTS_URL, ARTICLE_STORE_URL, ArticleLot} from "./article-store-api";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ArticleStoresService extends BaseEntityExtendedService<ArticleLot> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, ARTICLE_STORE_URL, ARTICLES_URL);
    }


}
