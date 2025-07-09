import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Contact } from './lead-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CRMLeadsService extends BaseEntityService<Contact> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/crm/leads');
    }
}
