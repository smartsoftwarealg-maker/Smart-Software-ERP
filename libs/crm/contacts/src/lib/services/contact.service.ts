import { BaseEntityService } from '@ss/common/api-base-entity';
import { Contact, CRM_CONTACT_URL } from './api';
import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class ContactService extends BaseEntityService<Contact> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CRM_CONTACT_URL);
    }
}
