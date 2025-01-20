import {Injectable} from '@angular/core';
import {
    Article, ARTICLES_URL,
    SERVICE_ARTICLES_URL
} from './article-api';
import {Observable} from 'rxjs';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ServiceArticleService extends BaseEntityExtendedService<Article> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ARTICLES_URL);
    }


    override get(iid: number | string): Observable<Article> {
        return super.get(iid);
    }

    getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{
        itemCount: number;
        body: Article[]
    }> {
        return super.getList(page, pageSize, ((filter??'') + '__n__'), sortBy, extraPrams);
    }
}
