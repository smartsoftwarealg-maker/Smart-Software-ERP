import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { CRMQuoteItem } from './quotes-api';


export const CRM_QUOTE_ITEMS_URL = '/items';
export const CRM_QUOTES_URL = '/crm/quotes';

@Injectable({
    providedIn: 'root'
})
export class CrmQuoteItemsService extends BaseEntityService<CRMQuoteItem> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CRM_QUOTE_ITEMS_URL, CRM_QUOTES_URL);
    }


}
