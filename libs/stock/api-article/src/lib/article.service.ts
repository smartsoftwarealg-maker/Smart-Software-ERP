import { Injectable } from '@angular/core';
import { Article, ARTICLES_URL } from './article-api';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';

export const DEFAULT_APP_CODE = 1;

@Injectable({
    providedIn: 'root'
})
export class ArticleService extends BaseEntityService<Article> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, ARTICLES_URL);
    }

}
