import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Lookup } from '@ss/logistics/ui-doc-import';
import { MailingListLine } from './miling-list-api.class';

export const MAILING_LIST = '/crm/mailing';
export const MAILING_LINE_LIST = '/lists';

@Injectable({
    providedIn: 'root',
})
export class MailingLineListService extends BaseEntityService<MailingListLine> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, MAILING_LINE_LIST ,MAILING_LIST);
    }
}

