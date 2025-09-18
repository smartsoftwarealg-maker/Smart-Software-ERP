import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Lookup } from '@ss/logistics/ui-doc-import';
import { CRMCalendar } from './calendar-list/calendar-api';

export const calendar = '/crm/calendar';

@Injectable({
    providedIn: 'root',
})
export class CrmCalendarService extends BaseEntityService<CRMCalendar> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, calendar);
    }
}

