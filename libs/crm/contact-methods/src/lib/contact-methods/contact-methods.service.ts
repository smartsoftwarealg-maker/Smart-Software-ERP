import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Lookup } from '@ss/logistics/ui-doc-import';

export const CONTACT_METHODS_URL = '/crm/crm_contact_methods';

@Injectable({
    providedIn: 'root',
})
export class ContactMethodsService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CONTACT_METHODS_URL);
    }
}
