import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ARTICLES_URL} from "@ss/stock/api-article";
import {Card, CARD_URL} from "./card-api";
import {ARTICLE_STORE_URL} from "../../../api-article-store/src";


@Injectable({
    providedIn: 'root'
})
export class CardService extends BaseEntityService<Card> {

    articleId: number;
    storeId: number;

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CARD_URL, ARTICLES_URL);
    }


    setParentsIds(articleId: number, storeId: number) {
        this.articleId = articleId;
        this.storeId = storeId;
    }

    setParentId(id: number) {
        throw Error("Cards requires two parents id articleId and storeId !");
    }

    protected getUrl(): string {
        return `${ARTICLES_URL}/${this.articleId}${ARTICLE_STORE_URL}/${this.storeId}${this.url}`;
    }

}
