import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Article, SS_ARTICLE_URL} from './scheduled-sales-api';
import {HttpService} from '@ss/common/api-common';
import {ARTICLE_IMAGE_URL, ARTICLES_URL} from '@ss/master-data/api-article';

@Injectable({
  providedIn: 'root'
})
export class SSArticleService extends BaseEntityService<Article>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SS_ARTICLE_URL);
    }

    public getPhotoUrl(id: number): string {
        return id != null && id > 0 ? (ARTICLES_URL + '/' + id + ARTICLE_IMAGE_URL) : null;
    }
}
