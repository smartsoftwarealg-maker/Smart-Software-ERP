import {Injectable} from '@angular/core';
import {
    Article,
    SERVICE_ARTICLES_URL
} from './article-api';
import {Observable} from 'rxjs';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';


@Injectable({
    providedIn: 'root'
})
export class ServiceArticleService extends BaseEntityExtendedService<Article> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SERVICE_ARTICLES_URL);
    }


    override get(iid: number | string): Observable<Article> {
        return super.get(iid);
    }
}
