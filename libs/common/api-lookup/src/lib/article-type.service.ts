import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {ARTICLE_TYPE_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from './lookup.class';

@Injectable({
    providedIn: 'root'
})
export class ArticleTypeService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ARTICLE_TYPE_URL);
    }
}
