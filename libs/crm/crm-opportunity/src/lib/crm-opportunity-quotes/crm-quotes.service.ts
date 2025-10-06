import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { CRMQuote } from './quotes-api';


export const CRM_QUOTES_URL = '/quotes';
export const CRM_OPPORTUNITY_URL = '/crm/opportunities/';
@Injectable({
    providedIn: 'root'
})
export class CrmQuotesService extends BaseEntityService<CRMQuote> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CRM_QUOTES_URL, CRM_OPPORTUNITY_URL);
    }

}
