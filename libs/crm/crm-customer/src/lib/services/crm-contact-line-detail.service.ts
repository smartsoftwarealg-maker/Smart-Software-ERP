import { BaseEntityService } from '@ss/common/api-base-entity';
import { Contact, CRM_ACCOUNT_URL, CRM_CONTACT_URL } from './api';
import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root',
})
export class CrmContactLineDetailService extends BaseEntityService<Contact> {
    constructor(protected override httpSrv: HttpService) {
        // super(httpSrv, CRM_CONTACT_URL, CRM_ACCOUNT_URL);
        super(httpSrv, '/contact', '/crm/accounts');
    }
}
