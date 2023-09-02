import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_ARTICLES, CMMS_WORKS, WorkArticle } from '@ss/cmms/cmms-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CMMSWorkOrderArticleService extends BaseEntityService<WorkArticle> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_ARTICLES, CMMS_WORKS);
    }
}
