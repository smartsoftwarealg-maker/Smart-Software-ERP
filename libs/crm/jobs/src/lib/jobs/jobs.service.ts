import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Lookup } from '@ss/logistics/ui-doc-import';

export const JOBS_URL = '/crm/crm_jobs';

@Injectable({
    providedIn: 'root',
})
export class JobsService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, JOBS_URL);
    }
}
