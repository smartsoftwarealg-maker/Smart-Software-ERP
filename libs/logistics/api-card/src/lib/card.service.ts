import {Injectable} from '@angular/core';
import {HttpService, PaginationModel} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ARTICLES_URL} from '@ss/stock/api-article';
import {Card, CARD_URL} from './card-api';
import {ARTICLE_STORE_URL} from '@ss/stock/api-article-store';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class CardService extends BaseEntityService<Card> {

    cardUrl: string;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CARD_URL, ARTICLES_URL);
    }


    loadByArticleId(pagination: PaginationModel, storeId: number, articleId: number): Observable<Card[]> {
        this.cardUrl = `${ARTICLES_URL}/${articleId}${ARTICLE_STORE_URL}/${storeId}${this.url}`;
        return this.getPage(pagination);
    }

    loadByArticleReference(pagination: PaginationModel, storeId: number, articleReference: string): Observable<Card[]> {
        this.cardUrl = `${ARTICLES_URL}${this.url}`;
        const params = new HttpParams()
            .set('store', (storeId || 0).toString())
            .set('reference', articleReference);
        return this.getPage(pagination, null, null, params)
    }


    protected override getUrl(): string {
        return this.cardUrl;
    }
}
