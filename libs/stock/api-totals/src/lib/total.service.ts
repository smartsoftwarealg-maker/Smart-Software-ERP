import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Total, TOTAL_URL} from "./total-api";
import {ARTICLES_URL} from "@ss/stock/api-article";
import {ARTICLE_STORE_URL} from "@ss/stock/api-article-store";


@Injectable({
    providedIn: 'root'
})
export class TotalService extends BaseEntityService<Total> {


    constructor(protected httpSrv: HttpService) {
        super(httpSrv, TOTAL_URL);
    }


    setParentsIds(documentId: number, documentURL: string) {
        this.parentId = documentId;
        this.parentUrl = documentURL;
    }

    // the parent url changes
    setParentId(id: number) {
        throw Error("Don't use this to set the parent url use you need to provide the parent url too");
    }

}
