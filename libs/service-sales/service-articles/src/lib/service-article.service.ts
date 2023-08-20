import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { SALES_SERVICES, Service } from './service-article-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class ServiceArticleService extends BaseEntityService<Service>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SALES_SERVICES);
    }
}
