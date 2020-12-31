import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Circulation, CIRCULATION_URL} from "./circulation-api";
import {ARTICLES_URL} from "@ss/stock/api-article";
import {Observable} from "rxjs";
import {ARTICLE_STORE_URL} from "../../../api-article-store/src";


@Injectable({
    providedIn: 'root'
})
export class CirculationService extends BaseEntityService<Circulation> {

    articleId: number;
    storeId: number;

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CIRCULATION_URL, ARTICLES_URL);
    }


    setParentsIds(articleId: number, storeId: number) {
        this.articleId = articleId;
        this.storeId = storeId;
    }

    setParentId(id: number) {
        throw Error("Circulations requires two parents id articleId and storeId !");
    }

    protected getUrl(): string {
        return `${ARTICLES_URL}/${this.articleId}${ARTICLE_STORE_URL}/${this.storeId}${this.url}`;
    }
}
