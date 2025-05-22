import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Lookup } from '@ss/logistics/ui-doc-import';

export const STATUS_URL = '/crm/crm_status';

@Injectable({
    providedIn: 'root',
})
export class StatusService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, STATUS_URL);
    }
}
