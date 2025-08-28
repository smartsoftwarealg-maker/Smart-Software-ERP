import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Lookup } from '@ss/logistics/ui-doc-import';

export const MAILING_LIST = '/crm/crm_mailing_lists';

@Injectable({
    providedIn: 'root',
})
export class MailingListService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, MAILING_LIST);
    }
}

