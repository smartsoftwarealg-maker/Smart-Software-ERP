import {Injectable} from '@angular/core';
import { Article, MAN_PRODUCT_URL } from './article-api';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';


@Injectable({
    providedIn: 'root'
})
export class ManufacturedArticleService extends BaseEntityExtendedService<Article> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, MAN_PRODUCT_URL);
    }
}
