import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Lookup } from '@ss/logistics/ui-doc-import';

export const ARTICLE_TYPE_URL = '/lookups/article_types';

@Injectable({
    providedIn: 'root'
})
export class ArticleTypeService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ARTICLE_TYPE_URL);
    }
}
